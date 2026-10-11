// The Hollow Ward: desktop shell. Loads app/index.html and starts in full screen.
const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

const FS_JS = "document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()";
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 640, minHeight: 400,
    backgroundColor: "#060605",
    title: "The Hollow Ward",
    icon: path.join(__dirname, "build", "icon.png"),
    autoHideMenuBar: true,
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, backgroundThrottling: false }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "app", "index.html"));
  win.once("ready-to-show", () => win.show());
  // Start in full screen through the page itself so the game's own state stays in sync.
  win.webContents.once("did-finish-load", () => {
    win.webContents.executeJavaScript("document.documentElement.requestFullscreen()", true).catch(() => {});
  });
  // F11 toggles full screen (the game also uses G).
  win.webContents.on("before-input-event", (e, input) => {
    if (input.type === "keyDown" && input.key === "F11") { e.preventDefault(); win.webContents.executeJavaScript(FS_JS, true).catch(() => {}); }
  });
  // Never navigate away from the game; open external links in the system browser.
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (e, url) => { if (!url.startsWith("file://")) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url); } });
}

const lock = app.requestSingleInstanceLock();
if (!lock) app.quit();
else {
  app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.whenReady().then(createWindow);
  app.on("window-all-closed", () => app.quit());
}
