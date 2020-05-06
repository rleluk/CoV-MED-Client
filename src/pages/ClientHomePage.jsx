import React from "react";
import { authenticationService } from "../_services/authentication.service"

export class ClientHomePage extends React.PureComponent {
    render() {
        return (
            <div>
                <h1>Client home page</h1>
                <button onClick={authenticationService.logout}>Logout</button>
            </div>
        );
    }
};