import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");
const TOKEN = {
  token: "token",
  city: "city",
};

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};



const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return null;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

const saveCityValue = async(city,value) =>{
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[city] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
}
const getCityValue = async (city) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[city];
  }
  return null;
};


export { saveKeyValue, getKeyValue, isExist, saveCityValue, getCityValue,  TOKEN };
