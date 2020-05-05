import React from "react";
import { authenticationService } from "../_services/authentication.service";

export class UserHomePage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this)
    }

    logout() {
        authenticationService.logout();
    }

    render() {
        return (
            <div>
                <h1>User home page</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
};