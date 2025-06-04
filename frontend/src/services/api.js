const API_BASE_URL = 'http://localhost:8000'; // Update this to your backend URL

export const submitWeather = async (weatherData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-weather/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(weatherData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to submit weather data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting weather data:', error);
    throw error;
  }
};

export const getAllWeather = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const updateWeather = async (id, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to update weather data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating weather data:', error);
    throw error;
  }
};

export const deleteWeather = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to delete weather data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting weather data:', error);
    throw error;
  }
};