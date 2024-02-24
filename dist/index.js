#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import inquirer from 'inquirer';
import chalk from "chalk";
import figlet from "figlet";
import addCode from './addCode.js';
import { questions } from './data/questions.js';
import config from './config/index.js';
import path from 'path';
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.greenBright(figlet.textSync("WIFF", {
            horizontalLayout: "full",
            verticalLayout: "default",
            font: "3D-ASCII"
        })));
        console.log(chalk.green.bold('Code to Word document in a jiff!'));
        const answers = yield inquirer.prompt(questions);
        config.codeFolderPath = answers.codeFolderPath;
        config.height = answers.height;
        config.width = answers.width;
        config.wordName = answers.wordName;
        config.outputFolderPath = answers.outputFolderPath;
        const testFolder = config.codeFolderPath;
        const files = fs.readdirSync(testFolder);
        config.files = files.filter((file) => path.extname(file) === ".c");
        if (!fs.existsSync("./tmp")) {
            fs.mkdirSync("./tmp");
        }
        console.log(chalk.bgRedBright.bold(' WARNING: DO NOT MOVE YOUR MOUSE UNTIL THE PROCESS ENDS '));
        setTimeout(() => {
            console.log(chalk.bgRedBright.bold(' WARNING: DO NOT MOVE YOUR MOUSE UNTIL THE PROCESS ENDS '));
        }, 1000);
        setTimeout(() => {
            console.log(chalk.yellowBright.bold('YEAH SECOND TIME WAS NEEDED THATS HOW BAD THE SITUATION IS'));
            addCode(config.files[0], `${testFolder}/${config.files[0]}`, config.files.length, 0, config.files[0].slice(0, config.files[0].length - 2));
        }, 2000);
    });
}
initialize();
//# sourceMappingURL=index.js.map