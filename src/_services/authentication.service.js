import history from "../_services/history.service";

export const authenticationService = {
    logout,
    checkAuthorization,
    redirectToHomepage,
    get userType () { return localStorage.getItem("userType"); },
    get authToken () { return localStorage.getItem("authToken"); },
    get userName () { return localStorage.getItem("userName"); }
};

function logout () {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    history.push("/");
}

function checkAuthorization() {
    return localStorage.getItem("authToken") && localStorage.getItem("userType") ? true : false;
}

function redirectToHomepage(userType) {
    switch(userType) {
        case "Client": 
            history.push("/client/homepage");
            break;
        case "Receptionist":
            history.push("/receptionist/homepage");
            break;
        case "Doctor":
            history.push("/doctor/homepage");
            break;
        default:
            throw new Error("Undefined user type.");
    }
}