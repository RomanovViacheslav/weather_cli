import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed("ERROR") + "" + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen("SUCCES") + "" + message);
};

const printHelp = () => {
  console.log(dedent`${chalk.bgCyan("HELP")}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вызова помощи
    -t [API_KEY] для сохранения токена`);
};

const printWeather = (res, icon) => {
  console.log(dedent`${chalk.bgYellowBright("WEATHER")}
    Погода в городе ${res.name}
    ${icon}${res.weather[0].description}
    Температура: ${res.main.temp}`);
};

export { printError, printSuccess, printHelp, printWeather };
