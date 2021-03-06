import React from "react";
import ExaminationResults from "../_components/ExaminationResults";
import { authenticationService, fetchService } from "../_services";

export class ExaminationResultsPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }
    
    async componentDidMount() {
        const fetchData = await fetchService.getData("/clients/examinations");
        this.setState({ data: fetchData });
    }

    render() {
        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }
        
        const { data } = this.state;

        return <ExaminationResults buttons={buttons} data={data} />;
    }
};