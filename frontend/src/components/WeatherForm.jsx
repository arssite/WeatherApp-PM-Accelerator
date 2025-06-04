import { useState, useEffect } from "react";
import { submitWeather, getAllWeather, deleteWeather, updateWeather } from "../services/api";
import "./WeatherForm.css";

const WeatherForm = () => {
  const [form, setForm] = useState({
    location: "",
    start_date: "",
    end_date: "",
  });
  const [weatherList, setWeatherList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Load existing weather data on component mount
  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      const response = await getAllWeather();
      setWeatherList(response.data || []);
    } catch (error) {
      console.error("Error loading weather data:", error);
      setMessage("Failed to load existing weather data.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Submitting...");
    
    try {
      const response = await submitWeather(form);
      console.log("✅ API Response:", response);
      
      // Reload all weather data to get the latest
      await loadWeatherData();
      
      setMessage("Weather data saved successfully!");
      setForm({ location: "", start_date: "", end_date: "" }); // Reset form
    } catch (error) {
      console.error("❌ Error submitting weather data:", error);
      setMessage(`Failed to submit weather data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this weather record?")) {
      return;
    }

    try {
      await deleteWeather(id);
      await loadWeatherData(); // Reload data
      setMessage("Weather record deleted successfully!");
    } catch (error) {
      console.error("Error deleting weather record:", error);
      setMessage(`Failed to delete weather record: ${error.message}`);
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setEditForm({
      location: entry.location,
      start_date: entry.start_date,
      end_date: entry.end_date,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWeather(editingId, editForm);
      await loadWeatherData(); // Reload data
      setEditingId(null);
      setEditForm({});
      setMessage("Weather record updated successfully!");
    } catch (error) {
      console.error("Error updating weather record:", error);
      setMessage(`Failed to update weather record: ${error.message}`);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const formatWeatherData = (data) => {
    if (!data) return "No weather data available";
    
    const current = data.current;
    if (!current) return JSON.stringify(data, null, 2);
    
    return {
      temperature: current.main?.temp,
      feelsLike: current.main?.feels_like,
      humidity: current.main?.humidity,
      pressure: current.main?.pressure,
      description: current.weather?.[0]?.description,
      condition: current.weather?.[0]?.main,
      windSpeed: current.wind?.speed,
      windDirection: current.wind?.deg,
      country: current.sys?.country,
      coordinates: {
        lat: current.coord?.lat,
        lon: current.coord?.lon
      }
    };
  };

  return (
    <div className="form-container">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>PM Accelerator Weather Forecast App</h1>
        <p>Created by Anmol Ratan Srivastava </p> 
        <button 
          onClick={() => window.open('https://www.linkedin.com/in/anmol-r-srivastava/', '_blank')}
          style={{ 
            padding: '5px 10px', 
            backgroundColor: '#0077b5', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          LinkedIn
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button 
          onClick={() => window.open('https://github.com/arssite', '_blank')}
          style={{ 
            padding: '5px 10px', 
            backgroundColor: '#000000', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          GitHub
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button 
          onClick={() => window.open('https://arssiteportfolio.netlify.app/', '_blank')}
          style={{ 
            padding: '5px 10px', 
            backgroundColor: '#7777b5', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Portfolio
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <br></br><br></br>
        <button 
          onClick={() => window.open('https://www.linkedin.com/school/pmaccelerator/', '_blank')}
          style={{ 
            padding: '5px 10px', 
            backgroundColor: '#FF0000', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ℹ️ About PM Accelerator
        </button>
      </div>

      <h2>Add New Weather Request</h2>
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          name="location"
          placeholder="Enter Location (City, Zip Code, Coordinates)"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Get Weather"}
        </button>
      </form>

      <p className="message">
        <em>{message}</em>
      </p>

      <h3>Weather Records ({weatherList.length})</h3>
      <div className="weather-results">
        {weatherList.length > 0 ? (
          weatherList.map((entry) => (
            <div key={entry.id} className="weather-card">
              {editingId === entry.id ? (
                // Edit mode
                <form onSubmit={handleUpdateSubmit}>
                  <h3>Editing Record</h3>
                  <input
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    placeholder="Location"
                    required
                  />
                  <input
                    type="date"
                    name="start_date"
                    value={editForm.start_date}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="date"
                    name="end_date"
                    value={editForm.end_date}
                    onChange={handleEditChange}
                    required
                  />
                  <div style={{ marginTop: '10px' }}>
                    <button type="submit" style={{ marginRight: '10px', backgroundColor: '#28a745' }}>
                      Save
                    </button>
                    <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#6c757d' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // View mode
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{entry.location}</h3>
                    <div>
                      <button 
                        onClick={() => handleEdit(entry)}
                        style={{ 
                          marginRight: '5px', 
                          padding: '5px 10px', 
                          backgroundColor: '#ffc107',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(entry.id)}
                        style={{ 
                          padding: '5px 10px', 
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <p><strong>Period:</strong> {entry.start_date} to {entry.end_date}</p>
                  <p><strong>Created:</strong> {new Date(entry.created_at).toLocaleDateString()}</p>
                  
                  {entry.weather_data?.current && (
                    <div style={{ marginTop: '10px' }}>
                      <h4>Current Weather:</h4>
                      <p><strong>Temperature:</strong> {entry.weather_data.current.main?.temp}°C</p>
                      <p><strong>Feels Like:</strong> {entry.weather_data.current.main?.feels_like}°C</p>
                      <p><strong>Condition:</strong> {entry.weather_data.current.weather?.[0]?.main} - {entry.weather_data.current.weather?.[0]?.description}</p>
                      <p><strong>Humidity:</strong> {entry.weather_data.current.main?.humidity}%</p>
                      <p><strong>Wind:</strong> {entry.weather_data.current.wind?.speed} m/s</p>
                      <p><strong>Country:</strong> {entry.weather_data.current.sys?.country}</p>
                      <p><strong>Coordinates:</strong> {entry.weather_data.current.coord?.lat}, {entry.weather_data.current.coord?.lon}</p>
                    </div>
                  )}

                  <details style={{ marginTop: '10px' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                      View Raw Data
                    </summary>
                    <pre style={{ 
                      backgroundColor: '#f5f5f5', 
                      padding: '10px', 
                      borderRadius: '5px', 
                      overflowX: 'auto',
                      fontSize: '12px',
                      maxHeight: '200px',
                      overflow: 'auto'
                    }}>
                      {JSON.stringify(entry.weather_data, null, 2)}
                    </pre>
                  </details>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No weather records found. Submit a weather request to get started!</p>
        )}
      </div>
    </div>
  );
};

export default WeatherForm;