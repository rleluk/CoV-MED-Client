import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
}

function login(username, password) {
    return fetch(process.env.REACT_APP_SERVER + "/users/authenticate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            console.log(user);
        })
        .catch(e => {
            console.log(e);
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}