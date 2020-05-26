import React from "react";

export class InfoBox extends React.PureComponent {
    render() {
        const { header, data } = this.props;

        return (
            <div className="data-box">
                <h1> {header} </h1>
                { data }
            </div>
        );
    }
};