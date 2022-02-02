const { app, BrowserWindow } = require('electron');
const { is } = require('electron-util');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile('index.html');

  if (is.development) {
    window.webContents.openDevTools();
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
