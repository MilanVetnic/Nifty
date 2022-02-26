function digitalClock() {
    var timeHTML = document.getElementById('time');
    var d = new Date();
    var date = d.getDate();
    date = addZero(date);
    var hours = d.getHours();
    hours = addZero(hours);
    var minutes = d.getMinutes();
    minutes = addZero(minutes);
    var seconds = d.getSeconds();
    seconds = addZero(seconds);
    timeHTML.innerHTML = hours + ' : ' + minutes + ' : ' + seconds;
}

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

setInterval(digitalClock, 1000);