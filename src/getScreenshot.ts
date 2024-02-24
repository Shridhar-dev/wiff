import pkg from 'active-win';
import robot, { type Bitmap } from 'robotjs'
import jimp from "jimp"
import config from './config/index.js';
import { type Result } from 'active-win';
const activeWindow = pkg;

const getActiveWindow = async() =>{
    const currentWindow:Result | undefined =(await activeWindow());
    return { 
        bounds:currentWindow?.bounds, 
        name:currentWindow?.owner.name, 
        title:currentWindow?.title 
    }
}

function screenCaptureToFile2(robotScreenPic:Bitmap, path:string) {
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
            
            image.crop(0,0, config.width, config.height).scale(0.5).write(path, resolve);
        
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
}
setTimeout(async()=>{
    let { bounds, title } = await getActiveWindow()
    title = title?.slice(0,title.length-1)
    if(bounds){
        robot.moveMouse(bounds.x+bounds.width-80, bounds.y+10);
        robot.mouseClick("left");
        setTimeout(()=>{
            var img = robot.screen.capture(bounds?.x, bounds?.y);
            screenCaptureToFile2(img,  `./tmp/${title}.png`)
        },1000)
    }
},1000)