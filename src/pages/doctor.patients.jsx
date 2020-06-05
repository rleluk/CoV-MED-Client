import React from "react";
import { Link } from "react-router-dom";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { authenticationService, fetchService } from "../_services";
import Button from "@material-ui/core/Button";

export class DoctorPatientsPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rows: null
        }
    }

    async componentDidMount() {
        const data = await fetchService.getData("/doctors/clients");
        
        if(!data || data.length === 0) {
            this.setState({ rows: [] });
            return;
        }
        
        let rows = []
        data.forEach(element => {
            let row = [];

            const name = element.firstName + " " + element.lastName;
            const historyButton = <Link to={{
                    pathname: "/doctor/client/examination-history", 
                    state: {
                        data: element.visits
                    }
                }}>
                    <Button color="primary"> Przejdź </Button>
                </Link>;

            const examinationsButton = <Link to={{
                    pathname: "/doctor/client/examination-results", 
                    state: {
                        data: element.examinations
                    }
                }}>
                    <Button color="primary"> Przejdź </Button>
            </Link>;

            row.push(name);
            row.push(historyButton);
            row.push(examinationsButton);

            rows.push(row);
        });

        this.setState({ rows: rows });
    }

    render() {
        const buttons = {
            "Panel doktora": { url: "/doctor/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        const headers = ["Imię i nazwisko pacjenta", "Historia leczenia", "Wyniki badań"];
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