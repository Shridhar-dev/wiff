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
import officegen from "officegen";
import { spawn } from 'child_process';
import path from 'path';
import config from './config/index.js';
import chalk from "chalk";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nodePath = path;
const docx = officegen('docx');
export default function addCode(name, path, length, current, justName) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        if (data.split("$")[1]) {
            let aim = data.split("$")[0].slice(3, data.split("$")[0].length);
            let properCode = data.split("$")[1];
            const paragraph = docx.createP();
            paragraph.addText(aim + "\n", { font_face: 'Arial', font_size: 12, bold: true });
            paragraph.addText(properCode);
            paragraph.addText("\n\nOUTPUT\n\n");
            let command = `start cmd.exe /K "cd "${config.codeFolderPath}" && TITLE ${justName} && gcc ${name} -o ${justName} && ${justName}.exe && cd ${__dirname.split("/").pop()} && node getScreenshot.js && exit"`;
            const terminal = spawn(command, [], { shell: true, stdio: ['ignore', 'pipe', 'pipe'] });
            terminal.on('close', (code) => {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield paragraph.addImage(`${__dirname.split("/").pop()}/tmp/${justName}  - node  getScreenshot.js.png`);
                    yield docx.putPageBreak();
                    if (length - 1 === current) {
                        setTimeout(() => {
                            const outputStream = fs.createWriteStream(`${config.outputFolderPath}/${config.wordName}.doc`);
                            docx.generate(outputStream);
                            outputStream.on('finish', () => {
                                console.log(chalk.black.bgGreenBright(' Word document created successfully. '));
                                fs.rm("./tmp", { recursive: true, force: true }, err => { if (err) {
                                    throw err;
                                } });
                                const newFiles = fs.readdirSync(config.codeFolderPath);
                                newFiles.forEach(file => {
                                    const filePath = nodePath.join(`${config.codeFolderPath}/`, file);
                                    if (nodePath.extname(file) === ".exe") {
                                        fs.unlink(filePath, err => {
                                            if (err) {
                                                console.error('Error deleting file:', err);
                                            }
                                        });
                                    }
                                });
                            });
                            outputStream.on('error', (err) => console.error('Error creating Word document:', err));
                        }, 500);
                    }
                    else {
                        addCode(config.files[current + 1], `${config.codeFolderPath}/${config.files[current + 1]}`, length, current + 1, config.files[current + 1].slice(0, config.files[current + 1].length - 2));
                    }
                }), 1000);
            });
        }
        else {
            console.log(chalk.yellowBright.bold(`${name}: aim set incorrectly or not set`));
            return;
        }
    });
}
//# sourceMappingURL=addCode.js.map