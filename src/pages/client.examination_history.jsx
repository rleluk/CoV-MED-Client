import React from "react";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { authenticationService } from "../_services/authentication.service";

export class ExaminationHistoryPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }
        
        const headers = ["Imię i nazwisko lekarza", "Data wizyty", "Recepty", "Skierowania"];
        const rows = [["sample data", "sample data", "sample data", "sample data"], ["sample data", "sample data", "sample data", "sample data"]];

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    <div className="page-header"> Historia leczenia </div>
                    <Table headers={headers} rows={rows}/>
                </div>
            </div>
        );
    }
};