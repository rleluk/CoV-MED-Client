import React from "react";
import ExaminationHistory from "../_components/ExaminationHistory";
import { authenticationService, fetchService } from "../_services";

export class ExaminationHistoryPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    async componentDidMount() {
        const fetchData = await fetchService.getData("/clients/visits?toDate" + new Date().toISOString());
        this.setState({ data: fetchData });
    }

    render() {
        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        const { data } = this.state;
        
        return <ExaminationHistory buttons={buttons} data={data} />;
    }
};