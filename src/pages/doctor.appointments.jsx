import React from "react";
import { withAlert } from "react-alert";

import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { authenticationService, fetchService, dateService } from "../_services";
import Button from '@material-ui/core/Button';

class DoctorAppointmentsPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rows: null
        }

        this.startVisit = this.startVisit.bind(this)
    }

    startVisit() {
        this.props.alert.show("Brak implementacji odbywania wizyt", { type: "error" });
    }

    async componentDidMount() {
        const data = await fetchService.getData("/doctors/visits?fromDate=" + new Date().toISOString());
        
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
                const startButton = <Button color="primary" onClick={this.startVisit}> Rozpocznij </Button>


                row.push(name);
                row.push(dateService.getFullDate(date));
                row.push(dateService.getFullTime(date));
                row.push(startButton);

                rows.push(row);
            })   
        });
        this.setState({ rows: rows });
    }

    render() {
        const buttons = {
            "Panel doktora": { url: "/doctor/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        const headers = ["Imię i nazwisko pacjenta", "Data wizyty", "Godzina wizyty", "Rozpocznij wizytę"];
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

export default withAlert()(DoctorAppointmentsPage);