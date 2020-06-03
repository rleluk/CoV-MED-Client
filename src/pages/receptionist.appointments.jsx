import React from "react";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { authenticationService } from "../_services/authentication.service";

export class ReceptionistAppointmentsPage extends React.PureComponent {
    render() {
        const buttons = {
            "Panel recepcjonisty": { url: "/receptionist/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }
        
        const headers = ["Imię i nazwisko pacjenta", "Data wizyty", "Godzina wizyty", "Przełóz", "Odwołaj"];
        const rows = [["sample data", "sample data", "sample data", "sample data", "sample data"], ["sample data", "sample data", "sample data", "sample data", "sample data"]];

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                   <div className="page-header"> E-wizyty </div>
                   <Table headers={headers} rows={rows}/>
                </div>
            </div>
        );
    }
};