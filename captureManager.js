const { captureAndSave } = require('./capture');

let isCapturing = false;
let captureInterval;

function startCapture(event, config) {  
  if (!isCapturing) {
    isCapturing = true;
    const interval = Math.floor(1000 / config.fps);
    captureInterval = setInterval(() => {
      captureAndSave(config).then(() => {
        event.reply('capture-frame');
      }).catch(error => {
        event.reply('capture-error', error.message);
      });
    }, interval);
    event.reply('capture-started');
  }
}

function stopCapture() {
  if (isCapturing && captureInterval) {
    clearInterval(captureInterval);
    isCapturing = false;
  }
}

module.exports = { startCapture, stopCapture };