let zIndexCounter = 1000;

function openApp(appId) {
    const app = document.getElementById(appId);
    app.style.display = 'block';
    app.style.top = '70px';
    app.style.left = '400px';
    bringToFront(app);
}

function closeApp(appId) {
    const app = document.getElementById(appId);
    app.style.display = 'none';
}

function bringToFront(app) {
    app.style.zIndex = ++zIndexCounter;
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
            element.style.left = (mouseX - offsetX) + 'px';
            element.style.top = (mouseY - offsetY) + 'px';
        }

        document.addEventListener('mousemove', onMouseMove);
        
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });
});
openApp('settings');