var timeText = document.querySelector("#time_text");

function updateTime() {
    var currentTime = new Date().toLocaleString();
    timeText.innerHTML =  currentTime;
}

setInterval(updateTime, 1000);