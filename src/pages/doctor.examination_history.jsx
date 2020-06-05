import React from "react";
import ExaminationHistory from "../_components/ExaminationHistory";
import { authenticationService } from "../_services/authentication.service";
import history from "../_services/history.service";

export class DoctorExaminationHistoryPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel doktora": { url: "/doctor/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }
        
        if(!this.props.location.state) {
            history.goBack();
        } else {
            var { data } = this.props.location.state;
        }
        
        return <ExaminationHistory buttons={buttons} data={data} />;
    }
};