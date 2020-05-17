import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

export class Header extends React.PureComponent {
    render() {
        const { buttons } = this.props;
        
        if(this.props.buttons) {
            var linkButtons = 
                <div className="button-wrapper">
                    {
                        Object.keys(buttons).map(key => (
                            <Link key={key} to={ buttons[key].url }>
                                <button type="button">
                                    { key }
                                </button>
                            </Link>
                        ))
                    }
                </div>   
        }

        return (
            <div className="header">
                <h1 className="logo"> CoV-MED </h1>
                { linkButtons }
            </div>
        );
    }
};