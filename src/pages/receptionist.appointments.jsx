import React from "react";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { fetchService } from "../_services/fetch.service";
import { authenticationService } from "../_services/authentication.service";

export class ReceptionistAppointmentsPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rows: null
        }

    }

    postponeVisit() {
        
    }

    cancelVisit() {

    }

    async componentDidMount() {
        const data = await fetchService.getData("/receptionists/visits?fromDate=" + new Date().toISOString());
        
        if(!data || data.length === 0) {
            this.setState({ rows: [] });
            return;
        }

        let rows = []
        data.forEach(element => {
            const name = element.firstName + " " + element.lastName;

            element.visits.sort((a, b) => a.date > b.date);
            element.visits.forEach(visit => {
                let row = [];

                const date = new Date(visit.date);
                const postponeButton = <button className="postpone-button" onClick={this.postponeVisit}> Przełóż </button>;
                const cancelButton = <button className="cancel-button" onClick={this.cancelVisit}> Odwołaj </button>;

                row.push(name);
                row.push(date.getDate() + "." + date.getMonth() + "." + date.getFullYear());
                row.push(date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0"));
                row.push(postponeButton);
                row.push(cancelButton);

                rows.push(row);
            })   
        });

        this.setState({ rows: rows });
    }

    render() {
        const buttons = {
            "Panel recepcjonisty": { url: "/receptionist/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }
        
        const headers = ["Imię i nazwisko pacjenta", "Data wizyty", "Godzina wizyty", "Przełóz", "Odwołaj"];
        const { rows } = this.state;

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                   <div className="page-header"> E-wizyty </div>
                   { rows ? (
                        rows.length ? (
                            <Table headers={headers} rows={rows}/>
                        ) : (
                            <h1> Nie znaleziono rekordów. </h1>
                        )) : (
                        <h1> Ładuję dane... </h1>
                    )}
                </div>
            </div>
        );
    }
};