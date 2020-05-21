import React from "react";
import { URL } from "../menuURLs";
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import { authenticationService } from "../_services/authentication.service";

export class DoctorAppointmentsPage extends React.PureComponent {
    render() {
        const buttons = {
            Wyloguj: { 
                action: authenticationService.logout 
            }
        }

        const urls = URL.doctor;

        return (
            <div>
                <Header buttons={buttons}/>
                <SideMenu urls={urls}/>
                <div className="content">
                    e-wizyty [doctor]
                </div>
            </div>
        );
    }
};