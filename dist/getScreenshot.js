var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pkg from 'active-win';
import robot from 'robotjs';
import jimp from "jimp";
import config from './config/index.js';
const activeWindow = pkg;
const getActiveWindow = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentWindow = (yield activeWindow());
    return {
        bounds: currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.bounds,
        name: currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.owner.name,
        title: currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.title
    };
});
function screenCaptureToFile2(robotScreenPic, path) {
    return new Promise((resolve, reject) => {
        try {
            const image = new jimp(robotScreenPic.width, robotScreenPic.height);
            let pos = 0;
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
            });
            image.crop(0, 0, config.width, config.height).scale(0.5).write(path, resolve);
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    });
}
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    let { bounds, title } = yield getActiveWindow();
    title = title === null || title === void 0 ? void 0 : title.slice(0, title.length - 1);
    if (bounds) {
        robot.moveMouse(bounds.x + bounds.width - 80, bounds.y + 10);
        robot.mouseClick("left");
        setTimeout(() => {
            var img = robot.screen.capture(bounds === null || bounds === void 0 ? void 0 : bounds.x, bounds === null || bounds === void 0 ? void 0 : bounds.y);
            screenCaptureToFile2(img, `./tmp/${title}.png`);
        }, 1000);
    }
}), 1000);
//# sourceMappingURL=getScreenshot.js.map