import history from "../_services/history.service";

export const authenticationService = {
    logout
};

function logout () {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    history.push("/signin");
}
