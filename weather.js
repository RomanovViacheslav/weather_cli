#!/ust/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { getWeather } from "./services/api.service.js";
import { saveKeyValue, TOKEN, saveCityValue } from "./services/storage.services.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(TOKEN.token, token);
    printSuccess("Токен сохранен");
    console.log(token);
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город");
    return;
  }
  try {
    await saveCityValue(TOKEN.city, city);
    printSuccess("Город сохранен");
    console.log(city);
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async() =>{
  try{
    const weather = await getWeather(process.env.CITY)
    printWeather(weather, '')
  } catch (e){
    if(e?.response?.status ==404){
      printError('Неверно указан город')
    } else if (e?.response?.status ==401){
      printError('Неверно указан токен')
    } else {
      printError(e.message)
    }
  }
  
}

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }
  if (args.s) {
    return saveCity(args.s)
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForcast()
};

initCLI();
