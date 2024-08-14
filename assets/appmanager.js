let settingsAppID = "settings";
let galleryAppID = "gallery";

let windowSettingsY = localStorage.getItem("windowSettingsY") || "70px";
let windowSettingsX = localStorage.getItem("windowSettingsX") || "400px";
let windowGalleryY = localStorage.getItem("windowGalleryY") || "70px";
let windowGalleryX = localStorage.getItem("windowGalleryX") || "400px";
let settingsWindowOpen = localStorage.getItem("settingsWindowOpen") || "true";
let galleryWindowOpen = localStorage.getItem("galleryWindowOpen") || "false";
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
    } else if (appId == galleryAppID) {
        localStorage.setItem("galleryWindowOpen", "true");
        app.style.display = 'block';
        app.style.top = windowGalleryY;
        app.style.left = windowGalleryX;
    }
}

function closeApp(appId) {
    if (appId == settingsAppID) {
        localStorage.setItem("settingsWindowOpen", "false");
    } else if (appId == galleryAppID) {
        localStorage.setItem("galleryWindowOpen", "false");
    }
    const app = document.getElementById(appId);
    app.style.display = 'none';
}

function bringToFront(app) {
    app.style.zIndex = MidZIndex;
    if (app == document.getElementById(settingsAppID)) {
        document.getElementById(galleryAppID).style.zIndex = MidZIndex - 1;
        localStorage.setItem("topWindow", "settings");
    } else if (app == document.getElementById(galleryAppID)) {
        document.getElementById(settingsAppID).style.zIndex = MidZIndex - 1;
        localStorage.setItem("topWindow", "gallery");
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
            }
            if (element.id === galleryAppID) {
                localStorage.setItem("windowGalleryX", left);
                localStorage.setItem("windowGalleryY", top);
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
if (galleryWindowOpen == "true") {
    openAppStartup(galleryAppID);
}

if (topWindow == "settings") {
    bringToFront(document.getElementById(settingsAppID));
}
if (topWindow == "gallery") {
    bringToFront(document.getElementById(galleryAppID));
}