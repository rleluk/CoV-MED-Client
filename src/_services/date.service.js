export const dateService = {
    getFullDate,
    getFullTime,
    getAvailableTime
};

function getFullDate(date, separator = ".", format="DD-MM-YYYY") {
    switch(format) {
        case "YYYY-MM-DD":
            return date.getFullYear() + separator + String(date.getMonth() + 1).padStart(2, "0") + separator + String(date.getDate()).padStart(2, "0");
        default:
            return String(date.getDate()).padStart(2, "0") + separator + String(date.getMonth() + 1).padStart(2, "0") + separator + date.getFullYear()
    }
}

function getFullTime(date) {
    return date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0")
}

function getAvailableTime(notAvailableTime) {
    notAvailableTime = notAvailableTime.map(el => {
        el = new Date(el);
        return el.getHours() + ":" + ((el.getMinutes() === 0) ? "00" : "30");
    });
    
    let availableTime = [];
    for(let i = 8; i <= 15; i++) {
        availableTime.push(i + ":00");
        availableTime.push(i + ":30");
    }

    availableTime = availableTime.filter((el) => !notAvailableTime.includes(el));
    return availableTime;
}