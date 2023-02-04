import https from "https";
import { getKeyValue, TOKEN } from "./storage.services.js";
import axios from "axios";

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN.token);
  if (!token) {
    throw new Error(
      "не задан ключ API, задайте его через команду -t [API_KEY]"
    );
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: city,
      appid: token,
      lang: "ru",
      units: "metric",
    }
  );
  return data;
};

export { getWeather };
