from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os, httpx
from datetime import datetime
from typing import Optional, List

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))

class WeatherRequest(BaseModel):
    location: str
    lat: Optional[float] = None
    lon: Optional[float] = None
    start_date: str
    end_date: str

class WeatherUpdate(BaseModel):
    location: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "Weather API is running"}

@app.post("/create-weather/")
async def create_weather(req: WeatherRequest):
    # Validate dates
    try:
        start_date = datetime.strptime(req.start_date, "%Y-%m-%d")
        end_date = datetime.strptime(req.end_date, "%Y-%m-%d")
        if start_date > end_date:
            raise HTTPException(status_code=400, detail="Start date must be before end date")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")

    # Get weather data from OpenWeatherMap API
    async with httpx.AsyncClient() as client:
        try:
            # Current weather endpoint
            weather_url = f"https://api.openweathermap.org/data/2.5/weather?q={req.location}&appid={os.getenv('OPENWEATHER_API_KEY')}&units=metric"
            response = await client.get(weather_url)
            
            if response.status_code != 200:
                raise HTTPException(status_code=404, detail="Location not found or API error")
            
            weather_data = response.json()
            
            # Optional: Get 5-day forecast
            forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?q={req.location}&appid={os.getenv('OPENWEATHER_API_KEY')}&units=metric"
            forecast_response = await client.get(forecast_url)
            forecast_data = forecast_response.json() if forecast_response.status_code == 200 else None
            
            # Combine weather data
            combined_data = {
                "current": weather_data,
                "forecast": forecast_data
            }
            
        except httpx.RequestError:
            raise HTTPException(status_code=500, detail="Failed to fetch weather data")

    # Save to database
    try:
        result = supabase.table("weather_requests").insert({
            "location": req.location,
            "lat": weather_data.get("coord", {}).get("lat", req.lat),
            "lon": weather_data.get("coord", {}).get("lon", req.lon),
            "start_date": req.start_date,
            "end_date": req.end_date,
            "weather_data": combined_data
        }).execute()
        
        if result.data:
            return {"message": "Weather data saved successfully", "data": result.data[0]}
        else:
            raise HTTPException(status_code=500, detail="Failed to save weather data")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/weather/")
async def get_all_weather():
    """Get all weather records from database"""
    try:
        result = supabase.table("weather_requests").select("*").order("created_at", desc=True).execute()
        return {"data": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/weather/{weather_id}")
async def get_weather_by_id(weather_id: str):
    """Get specific weather record by ID"""
    try:
        result = supabase.table("weather_requests").select("*").eq("id", weather_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Weather record not found")
        return {"data": result.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.put("/weather/{weather_id}")
async def update_weather(weather_id: str, update_data: WeatherUpdate):
    """Update weather record"""
    try:
        # Check if record exists
        existing = supabase.table("weather_requests").select("*").eq("id", weather_id).execute()
        if not existing.data:
            raise HTTPException(status_code=404, detail="Weather record not found")
        
        # Prepare update data (only non-None values)
        update_dict = {}
        if update_data.location is not None:
            update_dict["location"] = update_data.location
        if update_data.lat is not None:
            update_dict["lat"] = update_data.lat
        if update_data.lon is not None:
            update_dict["lon"] = update_data.lon
        if update_data.start_date is not None:
            # Validate date format
            try:
                datetime.strptime(update_data.start_date, "%Y-%m-%d")
                update_dict["start_date"] = update_data.start_date
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid start_date format. Use YYYY-MM-DD")
        if update_data.end_date is not None:
            # Validate date format
            try:
                datetime.strptime(update_data.end_date, "%Y-%m-%d")
                update_dict["end_date"] = update_data.end_date
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid end_date format. Use YYYY-MM-DD")
        
        if not update_dict:
            raise HTTPException(status_code=400, detail="No valid fields to update")
        
        # If location is being updated, fetch new weather data
        if "location" in update_dict:
            async with httpx.AsyncClient() as client:
                try:
                    weather_url = f"https://api.openweathermap.org/data/2.5/weather?q={update_dict['location']}&appid={os.getenv('OPENWEATHER_API_KEY')}&units=metric"
                    response = await client.get(weather_url)
                    
                    if response.status_code == 200:
                        weather_data = response.json()
                        update_dict["weather_data"] = {"current": weather_data}
                        update_dict["lat"] = weather_data.get("coord", {}).get("lat")
                        update_dict["lon"] = weather_data.get("coord", {}).get("lon")
                except httpx.RequestError:
                    pass  # Keep old weather data if API call fails
        
        result = supabase.table("weather_requests").update(update_dict).eq("id", weather_id).execute()
        return {"message": "Weather record updated successfully", "data": result.data[0]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.delete("/weather/{weather_id}")
async def delete_weather(weather_id: str):
    """Delete weather record"""
    try:
        # Check if record exists
        existing = supabase.table("weather_requests").select("*").eq("id", weather_id).execute()
        if not existing.data:
            raise HTTPException(status_code=404, detail="Weather record not found")
        
        result = supabase.table("weather_requests").delete().eq("id", weather_id).execute()
        return {"message": "Weather record deleted successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)