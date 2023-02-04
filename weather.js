#!/ust/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { getWeather } from "./services/api.service.js";
import { saveKeyValue, TOKEN } from "./services/storage.services.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(TOKEN.token, token);
    printSuccess("Токен сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }
  if (args.s) {
    // save city
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getWeather("moscow");
};

initCLI();
