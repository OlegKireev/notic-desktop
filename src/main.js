const { app, BrowserWindow } = require('electron');
const { is } = require('electron-util');

const config = require('./config');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 1100,
    height: 750,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  if (is.development) {
    window.loadURL(config.LOCAL_WEB_URL);
    window.webContents.openDevTools();
  } else {
    window.loadURL(config.PRODUCTION_WEB_URL);
  }

  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);

// Закрываем окно в MacOS только есть пользователь явно закрыл приложение
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Открывам окно при клике по свернутому приложению в dock (MacOS)
app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
