import express from 'express';
import axios from 'axios';

async function getWeather (lat, lon, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`
  try {
    const { data: { daily } } = await axios.get(url);
    return daily[0].feels_like.day;
  } catch (e) {
    console.error(`Error (${Date.now()}):` + e);
    return null;
  }
}

const app = express();

app.get('/cold-brew/:lat/:lon/:limit', async (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const threshold = req.params.limit;

  const tomorrow = await getWeather(lat, lon, process.env.WEATHER_KEY);
  const response = tomorrow > threshold;
  const error = (!lat || !lon || !threshold) ? 
    'Missing parameter, check your url' :
    (tomorrow === null) ? 
      'Something went wrong, try again later' :
      '';

  res.json({
    data: response,
    error: error
  })
});

app.listen(process.env.PORT || 4000);
