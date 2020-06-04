import React from "react";
import { withAlert } from "react-alert";

import { Link } from "react-router-dom";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { authenticationService, fetchService, dateService } from "../_services";
import Button from "@material-ui/core/Button";

class ReceptionistAppointmentsPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rows: null
        }

    }

    async cancelVisit(email, date) {
        const dataToSend = {
            client: {
                email: email
            },
            date: date
        }

        if (await fetchService.deleteData("/receptionists/cancel-visit", dataToSend)) {
            this.props.alert.show("Wizyta została pomyślnie odwołana", { type: "success" });
            this.updatePatient();
        } else {
            this.props.alert.show("Coś poszło nie tak...", { type: "error" });
        }
    }

    async updatePatient() {
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

                const postponeButton = <Link to={{
                            pathname: "/receptionist/postpone-appointment", 
                            state: {
                                visit: visit,
                                clientEmail: element.email
                            }
                        }}>
                        <Button color="primary"> Przełóż </Button>
                    </Link>;

                const cancelButton = <Button color="primary" onClick={() => this.cancelVisit(element.email, visit.date)}> Odwołaj </Button>;
                
                const date = new Date(visit.date);
                row.push(name);
                row.push(dateService.getFullDate(date));
                row.push(dateService.getFullTime(date));
                row.push(postponeButton);
                row.push(cancelButton);

                rows.push(row);
            })   
        });

        this.setState({ rows: rows });
    }

    componentDidMount() {
        this.updatePatient();
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

export default withAlert()(ReceptionistAppointmentsPage);