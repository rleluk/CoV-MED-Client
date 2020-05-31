import React from "react";
import jsPDF from "jspdf";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { fetchService } from "../_services/fetch.service";
import { authenticationService } from "../_services/authentication.service";

export class ExaminationResultsPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rows: []
        }

        this.createPdf = this.createPdf.bind(this)
    }
    
    createPdf = (text) => {
        var doc = new jsPDF();
        doc.text(text, 10, 10);
        doc.save("wyniki.pdf");
    }

    async componentDidMount() {
        const data = await fetchService.getData("/clients/examinations");
        
        if(!data || data.length === 0) {
            this.setState({ rows: [] });
            return;
        }
        
        let rows = [];
        data.forEach(element => {
            let row = [];
            const date = new Date(element.date);
            const button = <button className="save-button" onClick={() => this.createPdf(element.result)}> Pobierz </button>

            row.push(element.name);
            row.push(date.getDate() + "." + date.getMonth() + "." + date.getFullYear());
            row.push(date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0"));
            row.push(button);

            rows.push(row);
        });

        this.setState({ rows: rows });
    }

    render() {
        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        const headers = ["Nazwa badania", "Data badania", "Godzina badania", "Wyniki (.pdf)"];
        const { rows } = this.state;

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    <div className="page-header"> Wyniki badań </div>
                    {
                        rows.length ? <Table headers={headers} rows={rows}/> : <h1> Nie znaleziono rekordów. </h1>
                    }
                </div>
            </div>
        );
    }
};