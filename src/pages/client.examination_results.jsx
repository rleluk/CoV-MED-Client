import React from "react";
import { Header } from "../_components/Header";
import { authenticationService } from "../_services/authentication.service";

export class ExaminationResultsPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    wyniki badań [client]
                </div>
            </div>
        );
    }
};