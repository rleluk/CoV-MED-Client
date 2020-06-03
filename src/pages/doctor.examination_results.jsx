import React from "react";
import ExaminationResults from "../_components/ExaminationResults";
import { authenticationService } from "../_services/authentication.service";

export class DoctorExaminationResultsPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel doktora": { url: "/doctor/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        const { data } = this.props.location.state;
        
        return <ExaminationResults buttons={buttons} data={data} />;
    }
};