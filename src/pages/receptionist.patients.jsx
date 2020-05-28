import React from "react";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { authenticationService } from "../_services/authentication.service";

export class ReceptionistPatientsPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel receptjonisty": { url: "/receptionist/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        const headers = ["Imię i nazwisko pacjenta", "Status", "Akcja"];
        const rows = [["sample data", "sample data", "sample data"], ["sample data", "sample data", "sample data"]];

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    <div className="page-header"> Pacjenci </div>
                    <Table headers={headers} rows={rows}/>
                </div>
            </div>
        );
    }
};