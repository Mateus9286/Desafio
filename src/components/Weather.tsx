import React, { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { FaCloud, FaSun, FaCloudSun, FaCloudRain } from "react-icons/fa";

const weatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
  }),
  weather: z.array(
    z.object({
      description: z.string(),
      id: z.number(),
    })
  ),
});

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<
    (typeof weatherSchema)["_type"] | null
  >(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { coords } = await getCurrentPosition();
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        try {
          setWeatherData(weatherSchema.parse(data));
        } catch (validationError) {
          console.error("Weather data validation error:", validationError);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (navigator.geolocation) {
      fetchWeather();
    }
  }, []);

  const getCurrentPosition = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  if (!weatherData) {
    return <p className="text-center mt-8">Loading weather data...</p>;
  }

  const { name, main, weather } = weatherData;
  const weatherId = weather[0].id;

  let WeatherIcon;
  let textColor;

  if (weatherId < 300) {
    WeatherIcon = FaCloudRain;
    textColor = "text-blue-600";
  } else if (weatherId < 600) {
    WeatherIcon = FaCloudRain;
    textColor = "text-blue-800";
  } else if (weatherId < 700) {
    WeatherIcon = FaCloud;
    textColor = "text-gray-800";
  } else if (weatherId === 800) {
    WeatherIcon = FaSun;
    textColor = "text-yellow-500";
  } else {
    WeatherIcon = FaCloudSun;
    textColor = "text-gray-600";
  }

  return (
    <div className="flex flex-col items-center mt-8 p-4 border border-blue-500 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Weather in {name}</h1>
      <p className={`text-xl ${textColor}`}>
        <WeatherIcon className="inline mr-2" />
        Temperature: {main.temp}°C
      </p>
      <p className={`text-xl ${textColor}`}>
        <WeatherIcon className="inline mr-2" />
        Weather: {weather[0].description}
      </p>
    </div>
  );
};

export default Weather;
