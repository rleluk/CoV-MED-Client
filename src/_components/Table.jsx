import React from "react";
import "./Table.scss";

export class Table extends React.PureComponent {


    createTable() {
        const { headers, rows } = this.props;

        if(!headers) 
            return;

        let thead = [];
        let children = [];

        headers.forEach(header => {
            children.push(<th key={header}> { header } </th>);
        });
        thead.push(<tr key="thead">{ children }</tr>);
        
        let tbody = [];
        let i = 0;
            
        rows.forEach(row => {
            children = [];

            row.forEach(cell => {
                children.push(<td key={cell + i++}> { cell } </td>);
            });
            
            tbody.push(<tr key={row + i++}>{ children }</tr>);
        });

        return (
            <table> 
                <thead>
                    { thead }
                </thead>
                <tbody> 
                    { tbody }
                </tbody> 
            </table>
        );
    }

    render() {
        const table = this.createTable();

        return (
            <div className="table">
                { table }
            </div>
        );
    }
};