let time = document.getElementById("time");

function updateDateTime() {
    let date = new Date();
    let dateString = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    let timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toUpperCase();
    
    time.innerHTML = `${dateString} ${timeString}`;
}
updateDateTime();
setInterval(updateDateTime, 1000);
