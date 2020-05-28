import React from "react";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { authenticationService } from "../_services/authentication.service";

export class ExaminationResultsPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }


        const headers = ["Nazwa badania", "Data badania", "Godzina badania", "Wyniki (.pdf)"];
        const rows = [["sample data", "sample data", "sample data", "sample data"], ["sample data", "sample data", "sample data", "sample data"]];
        
        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    <div className="page-header"> Wyniki badań </div>
                    <Table headers={headers} rows={rows}/>
                </div>
            </div>
        );
    }
};