import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { WeatherCard } from './WeatherCard';


function App() {

  const [coordData, setCoordData] = useState<{lat: number, lng: number}>({lat: -1, lng: -1})
  const [outsideTemp, setOutsideTemp] = useState<number>(100)
  const [weatherIcon, setWeatherIcon] = useState<number>(-1)

  const locationConfig = {country: "Sweden", city: "Stockholm", region: "Södermalm"}

  const getCoord = useCallback((country: string, city: string, region: string) => {
    
    fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=7mRo0acEsPhCvc77c8Xm5Yrc1qkwI3nb&location=${country}, ${city}, ${region}`)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw response      
    })
    .then(data => {
      setCoordData(data.results[0].locations[0].latLng)
    })
    .catch(error => {
      console.error("failed to fetch data", error);
    })
    
    console.log(coordData)
  },[coordData])

  const getWeather = useCallback(() => {
      fetch(`http://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordData.lng}/lat/${coordData.lat}/data.json`)
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
        throw response
      })
      .then((data) => {
        console.log(data.timeSeries[0].parameters[10].values);
        setOutsideTemp(Math.floor(data.timeSeries[0].parameters[10].values));
        setWeatherIcon(data.timeSeries[0].parameters[18].values[0]);
      })
  },[coordData])  

  useEffect(() => {
    getCoord(locationConfig.country, locationConfig.city, locationConfig.region);
  },[])

  useEffect(() => {
    const interval = setInterval(() => {     
      getWeather();     
      console.log(coordData);
    }, 20000)
    return () => clearInterval(interval);
  }, [coordData, getWeather]);

  return (
    <div className="App">
      <WeatherCard 
      temp={outsideTemp} 
      location={locationConfig.region} 
      iconNumber={weatherIcon}/>
    </div>
  );
}

export default App;
