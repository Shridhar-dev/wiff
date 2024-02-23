import fs from 'fs'
import inquirer from 'inquirer';
import chalk from "chalk"
import figlet from "figlet"
import addCode from './addCode.js';
import { questions } from './questions.js';
import config from './config.js';
import path from 'path';


async function initialize(){
    console.log(
        chalk.greenBright(
        figlet.textSync("WIFF", {
            horizontalLayout: "full",
            verticalLayout: "default",
            font:"3D-ASCII"
        })
        )
    );
    console.log(chalk.green.bold('Code to Word document in a jiff!'));
    const answers = await inquirer.prompt(questions)
    config.codeFolderPath = answers.codeFolderPath;
    config.height = answers.height;
    config.width = answers.width;
    config.wordName = answers.wordName;
    config.outputFolderPath = answers.outputFolderPath;
    const testFolder = config.codeFolderPath;
    const files = fs.readdirSync(testFolder);
    config.files = files.filter((file)=>path.extname(file) === ".c");
    if (!fs.existsSync("./tmp")){
        fs.mkdirSync("./tmp");
    }
    console.log(chalk.bgRedBright.bold(' WARNING: DO NOT MOVE YOUR MOUSE UNTIL THE PROCESS ENDS '));
    setTimeout(()=>{
        console.log(chalk.bgRedBright.bold(' WARNING: DO NOT MOVE YOUR MOUSE UNTIL THE PROCESS ENDS '));
    },1000)
    setTimeout(()=>{
        console.log(chalk.yellowBright.bold('YEAH SECOND TIME WAS NEEDED THATS HOW BAD THE SITUATION IS'));
        addCode(config.files[0], `${testFolder}/${config.files[0]}`, config.files.length, 0, config.files[0].slice(0, config.files[0].length-2))
    },2000)
}

initialize()
