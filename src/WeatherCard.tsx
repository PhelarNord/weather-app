import {FC, useCallback} from "react";

import './WeatherCard.css'

import sun from './static/sun.png'
import cloud from './static/cloudy.png'
import rain from './static/rainy.png'
import snow from './static/snow.png'

interface WeatherCardProps {
    temp: number
    location: string
    iconNumber: number
}

interface DateOptions {
  weekday: string
  year: string
  month: string
  day: string
}

const options: DateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
const today = new Date();



export const WeatherCard = (props: WeatherCardProps) => {
    const {temp, location, iconNumber} = props

    const getWeatherIcon = useCallback(() => {
        switch (iconNumber) {
          case 1:
          case 2:
            console.log("Bild på sol");
            return <img className="weather-icon" src={sun} alt='Sol'></img>
          case 3:
          case 4:
          case 5:
          case 6:
            console.log("Bild på molnigt");
            return <img className="weather-icon" src={cloud} alt='Sol'></img>
          case 8:
          case 9:
          case 18:
          case 19:
          case 20:
            console.log("Bild på regn");
            return <img src={rain} alt='Sol'></img>
          case 15:
          case 16:
          case 17:
          case 25:
          case 26:
          case 27:
            console.log("Bild på snö");
            return <img src={snow} alt='Sol'></img>
          default:
            console.log("Ingen bild")
    
        }
        
      },[iconNumber])

    return(
        <div className="weather-card-container">
            <div className="weather-card">
                <div className="weather-now-box">
                <div className="location-text">{location}</div>
                <div className="date-text">{today.toLocaleDateString("en-US", options)}</div>
                <div className="horizontal-divider"></div>
                <div className="weather-icon-container">{getWeatherIcon()}</div>
                <div className="temp-text">{temp}</div>
                </div>
                <div className="weather-info-box">
                </div>
            </div>
        </div>
    )
}