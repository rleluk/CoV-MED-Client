import React from "react";
import jsPDF from "jspdf";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { fetchService } from "../_services/fetch.service";
import { authenticationService } from "../_services/authentication.service";

export class ExaminationHistoryPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rows: []
        }

        this.createPdf = this.createPdf.bind(this)
    }
    
    createPdf = (text, fileName) => {
        var doc = new jsPDF();
        doc.addFont('ArialMS', 'Arial', 'normal');
        doc.setFont('Arial');
        doc.text(text, 10, 10);
        doc.save(fileName);
    }

    parseReferral(object) {
        if(!object)
            return "";
        let text = "Skierowanie na badanie: " + object.medicalTreatment + "\n";
        text += "Data wystawienia: \n" + new Date(object.createdDate) + "\n";
        return text;
    }

    parsePrescription(object) {
        if(!object)
            return "";

        let text = "Medykamenty:\n";
        object.medicines.forEach(element => {
            text += "- " + element.name + ", " + element.size + "\n";
        });
        
        text += "\nData ważności: \n" + new Date(object.validityDate) + "\n";
        return text;
    }

    async componentDidMount() {
        const data = await fetchService.getData("/clients/visits?toDate" + Date.now());
        
        if(!data || data.length === 0) {
            this.setState({ rows: [] });
            return;
        }
        
        let rows = [];
        data.forEach(element => {
            let row = [];
            const date = new Date(element.date);
            const referralButton =  <button className="save-button" 
                onClick={() => this.createPdf(this.parseReferral(element.refferal), "skierowanie.pdf")}> Pobierz </button>;
            const prescriptionButton = <button className="save-button" 
                onClick={() => this.createPdf(this.parsePrescription(element.prescription), "recepta.pdf")}> Pobierz </button>;

            row.push(element.doctor.firstName + " " + element.doctor.lastName);
            row.push(date.getDate() + "." + date.getMonth() + "." + date.getFullYear());
            row.push(date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0"));
            row.push(prescriptionButton);
            row.push(referralButton);

            rows.push(row);
        });

        this.setState({ rows: rows });
    }

    render() {
        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }
        
        const headers = ["Imię i nazwisko lekarza", "Data wizyty", "Godzina wizyty", "Recepty", "Skierowania"];
        const { rows } = this.state;

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    <div className="page-header"> Historia leczenia </div>
                    {
                        rows.length ? <Table headers={headers} rows={rows}/> : <h1> Nie znaleziono rekordów. </h1>
                    }
                </div>
            </div>
        );
    }
};