import React from "react";
import { Header } from "../_components/Header";
import { authenticationService } from "../_services/authentication.service";

export class DoctorAppointmentsPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel doktora": { url: "/doctor/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    e-wizyty [doctor]
                </div>
            </div>
        );
    }
};