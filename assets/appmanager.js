let settingsAppID = "settings";
let firefoxAppID = "firefox";

let windowSettingsY = localStorage.getItem("windowSettingsY") || "70px";
let windowSettingsX = localStorage.getItem("windowSettingsX") || "400px";
let windowFirefoxY = localStorage.getItem("windowFirefoxY") || "70px";
let windowFirefoxX = localStorage.getItem("windowFirefoxX") || "400px";
let settingsWindowOpen = localStorage.getItem("settingsWindowOpen") || "true";
let firefoxWindowOpen = localStorage.getItem("firefoxWindowOpen") || "false";
let topWindow = localStorage.getItem("topWindow") || "settings";
let MidZIndex = 5;

function openApp(appId) {
    app = document.getElementById(appId);
    openAppStartup(appId)
    bringToFront(app);
}

function openAppStartup(appId) {
    const app = document.getElementById(appId);
    if (appId == settingsAppID) {
        localStorage.setItem("settingsWindowOpen", "true");
        app.style.display = 'block';
        app.style.top = windowSettingsY;
        app.style.left = windowSettingsX;
    } else if (appId == firefoxAppID) {
        localStorage.setItem("firefoxWindowOpen", "true");
        app.style.display = 'block';
        app.style.top = windowFirefoxY;
        app.style.left = windowFirefoxX;
    }
}

function closeApp(appId) {
    if (appId == settingsAppID) {
        localStorage.setItem("settingsWindowOpen", "false");
    } else if (appId == firefoxAppID) {
        localStorage.setItem("firefoxWindowOpen", "false");
    }
    const app = document.getElementById(appId);
    app.style.display = 'none';
}

function bringToFront(app) {
    app.style.zIndex = MidZIndex;
    if (app == document.getElementById(settingsAppID)) {
        document.getElementById(firefoxAppID).style.zIndex = MidZIndex - 1;
        localStorage.setItem("topWindow", "settings");
    } else if (app == document.getElementById(firefoxAppID)) {
        document.getElementById(settingsAppID).style.zIndex = MidZIndex - 1;
        localStorage.setItem("topWindow", "firefox");
    }
}

document.querySelectorAll('.app-header').forEach(header => {
    let element = header.parentElement;
    let offsetX, offsetY, mouseX, mouseY;
    
    element.addEventListener('mousedown', (e) => {
        bringToFront(element);
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        function onMouseMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            let left = (mouseX - offsetX) + 'px'
            let top = (mouseY - offsetY) + 'px'
            element.style.left = left;
            element.style.top = top;
            if (element.id === settingsAppID) {
                localStorage.setItem("windowSettingsX", left);
                localStorage.setItem("windowSettingsY", top);
                windowSettingsY = localStorage.getItem("windowSettingsY") || "70px";
                windowSettingsX = localStorage.getItem("windowSettingsX") || "400px";
            }
            if (element.id === firefoxAppID) {
                localStorage.setItem("windowFirefoxX", left);
                localStorage.setItem("windowFirefoxY", top);
                windowFirefoxY = localStorage.getItem("windowFirefoxY") || "70px";
                windowFirefoxX = localStorage.getItem("windowFirefoxX") || "400px";
            }
        }

        document.addEventListener('mousemove', onMouseMove);
        
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });
});

if (settingsWindowOpen == "true") {
    openAppStartup(settingsAppID);
}
if (firefoxWindowOpen == "true") {
    openAppStartup(firefoxAppID);
}

if (topWindow == "settings") {
    bringToFront(document.getElementById(settingsAppID));
}
if (topWindow == "firefox") {
    bringToFront(document.getElementById(firefoxAppID));
}