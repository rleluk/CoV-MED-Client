import React from "react";
import { Header } from "../_components/Header";
import { authenticationService } from "../_services/authentication.service";

export class ReceptionistPatientsPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel receptjonisty": { url: "/receptionist/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    pacjenci[receptionist]
                </div>
            </div>
        );
    }
};