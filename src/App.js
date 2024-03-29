


import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8a13df165f9099bdd3008e66764b2a56`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const resJson = await response.json();
        setCity(resJson);

        // Add search term to search history
        setSearchHistory(prevHistory => {
          if (!prevHistory.includes(search)) {
            return [...prevHistory, search];
          }
          return prevHistory;
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (search) {
      fetchApi();
    }
  }, [search]);

  // Save search history to local storage
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="App">
      <header className="App-header">
     {  /* <img src={logo} className="App-logo" alt="logo" />*/}
        <p style={{fontSize:"28px" , fontFamily:"sans-serif" , fontWeight:"bold" ,
      color:"darkblue" , backgroundColor:"cyan" }} >Weather Forecast</p>
  <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={() => setSearch(search)}>Search</button>
        </div>
        {city && (
          <div className="weather-container">
            <h2>{city.name}, {city.sys.country}</h2>
            <p className="temperature">Temperature: {city.main.temp} °C</p>
            <p className="weather-description">Weather: {city.weather[0].description}</p>
          </div>
        )}
        <div className="history-container">
          <h2 style={{fontSize:"28px" , fontFamily:"sans-serif" , fontWeight:"bold" ,
         color:"darkblue" , backgroundColor:"cyan" }}  >Search History</h2>
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button onClick={clearSearchHistory}>Clear History</button>
        </div>
     {  /* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}
      </header>
    </div>
  );
}

export default App;

