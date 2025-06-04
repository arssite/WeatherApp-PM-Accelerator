WeatherApp-PM-Accelerator
A comprehensive weather application built as part of the Product Management Accelerator program. This project demonstrates modern web development practices, API integration, and user-centered design principles.
🌟 Features

Real-time Weather Data: Get current weather conditions for any location
5-Day Forecast: Extended weather predictions with detailed information
Location Search: Search for weather by city name or coordinates
Geolocation Support: Automatic location detection with user permission
Responsive Design: Optimized for desktop, tablet, and mobile devices
Weather Icons: Visual representation of weather conditions
Temperature Units: Toggle between Celsius and Fahrenheit
Local Storage: Remember user preferences and recent searches

🚀 Demo
Live Demo | Screenshots
🛠️ Tech Stack

Frontend: HTML5, CSS3, JavaScript (ES6+)
API: OpenWeatherMap API
Styling: CSS Grid, Flexbox, Custom Properties
Icons: Weather Icons Library
Build Tools: [Your build tools if any]

📋 Prerequisites
Before you begin, ensure you have:

A modern web browser
An API key from OpenWeatherMap
Basic knowledge of HTML, CSS, and JavaScript

🔧 Installation

Clone the repository
bashgit clone https://github.com/arssite/WeatherApp-PM-Accelerator.git
cd WeatherApp-PM-Accelerator

Get your API key

Sign up at OpenWeatherMap
Generate a free API key
Copy your API key


Configure the API key

Create a config.js file in the root directory
Add your API key:

javascriptconst API_KEY = 'your_api_key_here';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

Launch the application

Open index.html in your web browser
Or use a local server:

bash# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .


📱 Usage

Search for a location: Enter a city name in the search bar
Use current location: Click the location button to use GPS
View weather details: See current conditions and 5-day forecast
Change units: Toggle between Celsius and Fahrenheit
Save favorites: Bookmark frequently checked locations

🏗️ Project Structure
WeatherApp-PM-Accelerator/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main stylesheet
│   └── responsive.css     # Mobile responsiveness
├── js/
│   ├── app.js            # Main application logic
│   ├── weather.js        # Weather API functions
│   └── utils.js          # Utility functions
├── assets/
│   ├── icons/            # Weather icons
│   └── images/           # App images
├── config.js             # API configuration
└── README.md             # Project documentation
🎨 Screenshots
Desktop View
Show Image
Mobile View
Show Image
🌐 API Reference
This app uses the OpenWeatherMap API:

Current Weather: GET /weather?q={city}&appid={API_KEY}
5-Day Forecast: GET /forecast?q={city}&appid={API_KEY}
Geolocation: GET /weather?lat={lat}&lon={lon}&appid={API_KEY}

🚧 Roadmap

 Weather alerts and notifications
 Historical weather data
 Weather maps integration
 Social sharing features
 PWA (Progressive Web App) support
 Dark/Light theme toggle
 Multiple language support

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
👨‍💻 Author
[Your Name]

GitHub: @arssite
LinkedIn: Your LinkedIn
Email: your.email@example.com

🙏 Acknowledgments

OpenWeatherMap for the weather API
Weather Icons for beautiful weather icons
PM Accelerator program for the learning opportunity
All contributors who help improve this project

📞 Support
If you have any questions or run into issues:

Check the Issues page
Create a new issue if your problem isn't already reported
Reach out via email or LinkedIn


⭐ Star this repository if you found it helpful!
Built with ❤️ during the Product Management Accelerator program
