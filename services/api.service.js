import https from "https";
import { getKeyValue, TOKEN, getCityValue } from "./storage.services.js";
import axios from "axios";

const getWeather = async () => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN.token));
  const city = process.env.CITY ?? (await getCityValue(TOKEN.city));
  if (!token) {
    throw new Error(
      "не задан ключ API, задайте его через команду -t [API_KEY]"
    );
  }
  if (!city) {
    throw new Error(
      "не задан город, задайте его через команду -s [CITY]"
    );
  }
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );
  return data;
};

export { getWeather };
