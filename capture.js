const screenshot = require('screenshot-desktop');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const axios = require('axios');


let frameCount = 0;

// 确保输出目录存在
function ensureOutputDir(outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {recursive: true});
    }
}

// 截图并保存
async function captureAndSave(config) {
    if (config.saveLocal) {
        ensureOutputDir(config.outputDir);
    }
    // 捕获屏幕
    const screenshot_buffer = await screenshot();
    // 使用sharp处理图片
    const processedImage = await sharp(screenshot_buffer)
        .extract({
            left: config.x,
            top: config.y,
            width: config.width,
            height: config.height
        })
        .toBuffer();
    // 保存到本地
    if (config.saveLocal) {
        sharp(processedImage).toFile(path.join(config.outputDir, `${Date.now()}.png`));
    }
    // 上传图片
    if (config.uploadUrl) {
        try {
            const formData = new FormData();
            const blob = new Blob([processedImage], {type: 'image/jpg'});
            formData.append('image', blob, `${Date.now()}.jpg`);
            const res = await axios.post(config.uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "accessId": '3d9981c26d924e34bc25bc278a0353cd',
                },
            });
            console.log('res--------->', res.data)
        } catch (error) {
            console.error('上传图片失败:', error);
        }
    }
    frameCount++;
    return frameCount;
}

module.exports = {
    captureAndSave
};