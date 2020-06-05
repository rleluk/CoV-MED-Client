export const dateService = {
    getFullDate,
    getFullTime
};

function getFullDate(date, separator = ".", format="DD-MM-YYYY") {
    switch(format) {
        case "YYYY-MM-DD":
            return date.getFullYear() + separator + String(date.getMonth()).padStart(2, "0") + separator + String(date.getDate()).padStart(2, "0");
        default:
            return String(date.getDate()).padStart(2, "0") + separator + String(date.getMonth()).padStart(2, "0") + separator + date.getFullYear()
    }
}

function getFullTime(date) {
    return date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0")
}