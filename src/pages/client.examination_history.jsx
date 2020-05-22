import React from "react";
import { Header } from "../_components/Header";
import { authenticationService } from "../_services/authentication.service";

export class ExaminationHistoryPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    historia leczenia [client]
                </div>
            </div>
        );
    }
};