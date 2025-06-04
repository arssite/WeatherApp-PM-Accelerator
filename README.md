# Weather App - PM Accelerator Technical Assessment

> **Created by:** Anmol Ratan Srivastava  
> **Portfolio:** [arssiteportfolio.netlify.app](https://arssiteportfolio.netlify.app/)  
> **LinkedIn:** [linkedin.com/in/anmol-r-srivastava](https://www.linkedin.com/in/anmol-r-srivastava/)  
> **GitHub:** [github.com/arssite](https://github.com/arssite) <br>
> **Video Link** [Drive Link](https://drive.google.com/file/d/1POOvOL9gWYv1KbknsR_FMuYsKSqJ1lvf/view?usp=sharing)

A full-stack weather application built for the PM Accelerator AI Engineer Intern position, featuring real-time weather data, CRUD operations, and database persistence.

## 🌟 Features

### Tech Assessment 1 (Completed)
- ✅ **Location Input Flexibility**: Supports city names, zip codes, GPS coordinates, and landmarks
- ✅ **Real-time Weather Data**: Fetches current weather from OpenWeatherMap API
- ✅ **5-day Forecast**: Extended weather predictions
- ✅ **Responsive Design**: Clean, user-friendly interface
- ✅ **Weather Icons & Visualization**: Intuitive weather display

### Tech Assessment 2 (Completed)
- ✅ **CRUD Operations**: Full Create, Read, Update, Delete functionality
- ✅ **Database Persistence**: Supabase PostgreSQL integration
- ✅ **Date Range Validation**: Input validation for date ranges
- ✅ **Location Validation**: Fuzzy matching and location verification
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Data Export**: JSON format support (extensible to XML, CSV, PDF)

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Supabase** - PostgreSQL database with real-time features
- **OpenWeatherMap API** - Weather data provider
- **Pydantic** - Data validation
- **HTTPX** - Async HTTP client

### Frontend
- **React** - Component-based UI library
- **Vite** - Fast build tool and dev server
- **CSS3** - Responsive styling
- **Fetch API** - HTTP requests

### Database
- **PostgreSQL** (via Supabase) - Relational database
- **Real-time subscriptions** - Live data updates

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenWeatherMap API Key
- Supabase Account

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/arssite/WeatherApp-PM-Accelerator.git
   cd WeatherApp-PM-Accelerator/backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENWEATHER_API_KEY=your_openweathermap_api_key
   ```

4. **Database Setup**
   Create the following table in your Supabase dashboard:
   ```sql
   CREATE TABLE weather_requests (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     location TEXT NOT NULL,
     lat FLOAT,
     lon FLOAT,
     start_date DATE NOT NULL,
     end_date DATE NOT NULL,
     weather_data JSONB,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Start the backend server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
WeatherApp-PM-Accelerator/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherForm.jsx
│   │   │   └── WeatherForm.css
│   │   ├── services/
│   │   │   ├── api.js       # API calls
│   │   │   └── supabaseClient.js
│   │   ├── styles/
│   │   │   └── app.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔧 API Endpoints

### Weather Operations
- `POST /create-weather/` - Create new weather request
- `GET /weather/` - Get all weather records
- `GET /weather/{id}` - Get specific weather record
- `PUT /weather/{id}` - Update weather record
- `DELETE /weather/{id}` - Delete weather record

### Request/Response Examples

**Create Weather Request:**
```json
POST /create-weather/
{
  "location": "New York",
  "start_date": "2024-01-15",
  "end_date": "2024-01-20"
}
```

**Response:**
```json
{
  "message": "Weather data saved successfully",
  "data": {
    "id": "uuid",
    "location": "New York",
    "lat": 40.7128,
    "lon": -74.0060,
    "weather_data": {...}
  }
}
```

## 🎯 Key Features Implementation

### 1. **Flexible Location Input**
- Accepts various location formats (city, zip code, coordinates)
- Automatic geocoding through OpenWeatherMap API
- Location validation and fuzzy matching

### 2. **Comprehensive Weather Data**
- Current weather conditions
- 5-day forecast
- Temperature, humidity, wind speed, pressure
- Weather descriptions and conditions

### 3. **Full CRUD Operations**
- **Create**: Add new weather requests with validation
- **Read**: View all records with detailed weather information
- **Update**: Edit location and date ranges
- **Delete**: Remove records with confirmation

### 4. **Data Validation**
- Date range validation (start < end)
- Location existence verification
- Input sanitization and error handling

### 5. **User Experience**
- Responsive design for mobile and desktop
- Loading states and user feedback
- Intuitive edit/delete operations
- Collapsible raw data view

## 🌐 Live Demo

[Demo Video Link] - (https://drive.google.com/file/d/1POOvOL9gWYv1KbknsR_FMuYsKSqJ1lvf/view?usp=sharing)

## 🔐 Environment Variables

### Backend (.env)
```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENWEATHER_API_KEY=your_openweather_api_key
```

## 📦 Dependencies

### Backend Requirements
```
fastapi
uvicorn
pydantic
supabase
python-dotenv
httpx
```

### Frontend Dependencies
- React 18+
- Vite
- Standard web APIs (Fetch, DOM)

## 🚀 Deployment Options

### Backend Deployment
- **Heroku**: Easy Python app deployment
- **Railway**: Modern deployment platform
- **DigitalOcean App Platform**: Scalable hosting
- **AWS/GCP/Azure**: Cloud platform deployment

### Frontend Deployment
- **Netlify**: Automatic deployments from Git
- **Vercel**: Optimized for React applications
- **GitHub Pages**: Static site hosting

## 🔍 Testing

### Manual Testing Checklist
- [ ] Submit weather request with city name
- [ ] Submit weather request with zip code
- [ ] Test date validation (invalid ranges)
- [ ] Test location validation (non-existent places)
- [ ] Edit existing weather records
- [ ] Delete weather records
- [ ] View detailed weather information
- [ ] Test responsive design on mobile

### API Testing
Use tools like Postman or curl to test endpoints:
```bash
# Test weather creation
curl -X POST "http://localhost:8000/create-weather/" \
     -H "Content-Type: application/json" \
     -d '{"location":"London","start_date":"2024-01-15","end_date":"2024-01-20"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for the PM Accelerator technical assessment. All rights reserved.

## 📞 Contact

**Anmol Ratan Srivastava**
- Portfolio: [arssiteportfolio.netlify.app](https://arssiteportfolio.netlify.app/)
- LinkedIn: [linkedin.com/in/anmol-r-srivastava](https://www.linkedin.com/in/anmol-r-srivastava/)
- GitHub: [github.com/arssite](https://github.com/arssite)

---

**About PM Accelerator**: [Product Manager Accelerator](https://www.linkedin.com/school/pmaccelerator/) - Empowering the next generation of product managers through comprehensive training and real-world experience.

## 🏆 Assessment Completion Status

- ✅ **Tech Assessment 1**: Complete with all required and bonus features
- ✅ **Tech Assessment 2**: Complete with CRUD operations and database persistence
- ✅ **Bonus Features**: Advanced error handling, responsive design, data export capabilities
- ✅ **Code Quality**: Clean, documented, and production-ready code

---

*This project demonstrates full-stack development capabilities, API integration, database management, and modern web application best practices as required for the PM Accelerator AI Engineer Intern position.*
