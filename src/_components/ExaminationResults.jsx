import React from "react";
import jsPDF from "jspdf";
import { Table } from "../_components/Table";
import { Header } from "../_components/Header";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class ExaminationResults extends React.PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            rows: null
        }

        this.createPdf = this.createPdf.bind(this)
    }
    
    createPdf = (text) => {
        var doc = new jsPDF();
        doc.text(text, 10, 10);
        doc.save("wyniki.pdf");
    }

    updateTableData(data) {
        if(!data)
            return;
            
        if(data.length === 0) {
            this.setState({ rows: [] });
            return;
        }
        
        let rows = [];
        data.forEach(element => {
            let row = [];
            const date = new Date(element.date);
            const button = <Button color="primary" onClick={() => this.createPdf(element.result)}> Pobierz </Button>

            row.push(element.name);
            row.push(date.getDate() + "." + date.getMonth() + "." + date.getFullYear());
            row.push(date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0"));
            row.push(button);

            rows.push(row);
        });

        this.setState({ rows: rows });
    }
    
    async componentDidMount() {
        const { data } = this.props; 
        this.updateTableData(data);
    }

    async componentDidUpdate(prevProps, prevState)  {
        if(prevProps.data === this.props.data) 
            return;

        const { data } = this.props;
        this.updateTableData(data);        
    }

    render() {
        const { buttons } = this.props;
        const headers = ["Nazwa badania", "Data badania", "Godzina badania", "Wyniki (.pdf)"];
        const { rows } = this.state;

        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    <div className="page-header"> Wyniki badań </div>
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

export default ExaminationResults;