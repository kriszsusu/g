const monthsElement = document.getElementById('months');
const weeksElement = document.getElementById('weeks');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let {ename, edate} = params;
if(!ename || !edate) {
    ename = "Valamedd";
    edate = "2999-12-31";
}

const titleElement = document.getElementById('title');
titleElement.innerText = `${String(ename).charAt(0).toUpperCase() + String(ename).slice(1)}ig hátralevő idő`;

const now = new Date().getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = new Date(edate) - now;

    if (distance < 0) {
        document.querySelector('.countdown').innerHTML = `
            <div class="time">
                <span id="seconds">🎉</span>
                <span class="label">${String(ename).charAt(0).toUpperCase() + String(ename).slice(1)} van!</span>
            </div>
        `;
        return;
    }

    const totalSeconds = Math.floor(distance / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;
    const secondsInMonth = 2629746;

    const months = Math.floor(totalSeconds / secondsInMonth);
    const weeks = Math.floor((totalSeconds % secondsInMonth) / secondsInWeek);
    const days = Math.floor((totalSeconds % secondsInWeek) / secondsInDay);
    const hours = Math.floor((totalSeconds % secondsInDay) / secondsInHour);
    const minutes = Math.floor((totalSeconds % secondsInHour) / secondsInMinute);
    const seconds = Math.floor(totalSeconds % secondsInMinute);

    monthsElement.innerText = months.toString().padStart(2, '0');
    document.querySelector(".months").style.display = months > 0 ? "inline" : "none";

    weeksElement.innerText = weeks.toString().padStart(2, '0');
    document.querySelector(".weeks").style.display = (weeks > 0 || months > 0) ? "inline" : "none";

    daysElement.innerText = days.toString().padStart(2, '0');
    document.querySelector(".days").style.display = (days > 0 || weeks > 0 || months > 0) ? "inline" : "none";

    hoursElement.innerText = hours.toString().padStart(2, '0');
    document.querySelector(".hours").style.display = (hours > 0 || days > 0 || weeks > 0 || months > 0) ? "inline" : "none";

    minutesElement.innerText = minutes.toString().padStart(2, '0');
    document.querySelector(".minutes").style.display = (minutes > 0 || hours > 0 || days > 0 || weeks > 0 || months > 0) ? "inline" : "none";

    secondsElement.innerText = seconds.toString().padStart(2, '0');

    if (distance <= 0) {
        document.querySelector('.countdown').innerHTML = `
        <div class="time">
            <span id="seconds">🎉</span>
            <span class="label">${String(ename).charAt(0).toUpperCase() + String(ename).slice(1)} van!</span>
        </div>
        `;
        clearInterval(countdownInterval);
        return;
    }
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);
