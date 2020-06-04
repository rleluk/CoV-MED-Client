import React from "react";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { authenticationService, fetchService } from "../_services";
import Button from "@material-ui/core/Button";

export class ReceptionistPatientsPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rows: null
        }
        
        this.changeStatus = this.changeStatus.bind(this);
    }

    async changeStatus(active, email) {
        if(active) {
            await fetchService.putData("/receptionists/deactivate/" + email);
        } else {
            await fetchService.putData("/receptionists/activate/" + email);
        }

        this.updatePatient();
    }

    async updatePatient() {
        const data = await fetchService.getData("/clients");

        if(!data || data.length === 0) {
            this.setState({ rows: [] });
            return;
        }
        
        let rows = []
        data.forEach(element => {
            let row = [];

            const name = element.firstName + " " + element.lastName;
            const active = element.active;
            const status = element.active ? 
                <div style={{color: "green"}}> Aktywny </div> : 
                <div style={{color: "red"}}> Nieaktywny </div>;
            const button = <Button color="primary" onClick={() => this.changeStatus(active, element.email)}> { active ? "Dezaktywuj" : "Aktywuj" } </Button>;

            row.push(name);
            row.push(status);
            row.push(button);

            rows.push(row);
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

        const headers = ["Imię i nazwisko pacjenta", "Status", "Akcja"];
        const { rows } = this.state;
        
        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    <div className="page-header"> Pacjenci </div>
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