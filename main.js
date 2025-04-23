const {app, BrowserWindow, ipcMain} = require('electron');
const {startCapture, stopCapture} = require('./captureManager');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        transparent: true, // 设置窗口透明
        frame: false, // 要创建无边框窗口
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    mainWindow.loadFile('index.html');
    mainWindow.maximize();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('start-capture', (event, config) => {
    startCapture(event, config);
});
ipcMain.on('stop-capture', () => {
    stopCapture();
});
ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
});

ipcMain.on('mini-window', () => {
    console.log('mini-window event received');
    mainWindow.minimize();
});

ipcMain.on('close-window', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.close();
    }
});