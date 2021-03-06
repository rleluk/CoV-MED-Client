import React from "react";
import jsPDF from "jspdf";
import Button from "@material-ui/core/Button";

import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import { dateService } from "../_services/date.service";

class ExaminationHistory extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rows: null
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

    updateTableData(data) {
        if(!data)
            return;
            
        if(data.length === 0) {
            this.setState({ rows: [] });
            return;
        }
        
        data.sort((a, b) => a.date < b.date);
        
        let rows = [];
        data.forEach(element => {
            let row = [];
            const date = new Date(element.date);
            const referralButton = element.refferal ? ( <Button color="primary"
                    onClick={() => this.createPdf(this.parseReferral(element.refferal), "skierowanie.pdf")}> Pobierz </Button>) : ("---");

            const prescriptionButton = element.prescription ? ( <Button color="primary"
                    onClick={() => this.createPdf(this.parsePrescription(element.prescription), "recepta.pdf")}> Pobierz </Button>) : ("---");

            row.push(element.doctor.firstName + " " + element.doctor.lastName);
            row.push(dateService.getFullDate(date));
            row.push(dateService.getFullTime(date));
            row.push(prescriptionButton);
            row.push(referralButton);

            rows.push(row);
        });

        this.setState({ rows: rows });
    }

    async componentDidMount() {
        const { data } = this.props; 
        this.updateTableData(data);
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevProps.data === this.props.data) 
            return;
            
        const { data } = this.props; 
        this.updateTableData(data);
    }

    render() {
        const { buttons } = this.props;
        const headers = ["Imię i nazwisko lekarza", "Data wizyty", "Godzina wizyty", "Recepty", "Skierowania"]
        const { rows } = this.state;

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    <div className="page-header"> Historia leczenia </div>
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

export default ExaminationHistory;