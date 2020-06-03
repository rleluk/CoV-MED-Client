import React from "react";
import ExaminationHistory from "../_components/ExaminationHistory";
import { authenticationService } from "../_services/authentication.service";

export class DoctorExaminationHistoryPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel doktora": { url: "/doctor/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }
        
        const { data } = this.props.location.state;
        
        return <ExaminationHistory buttons={buttons} data={data} />;
    }
};