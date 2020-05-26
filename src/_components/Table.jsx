import React from "react";
import "./Table.scss";

export class Table extends React.PureComponent {
    render() {
        const { columns } = this.props;

        columns = {
            
        }

        if(this.props.columns) {
            var table = 
                <table>

                </table>   
        }

        return (
            <div className="table">
                { table }
            </div>
        );
    }
};