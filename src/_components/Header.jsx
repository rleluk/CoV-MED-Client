import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

export class Header extends React.PureComponent {
    render() {
        const { buttons } = this.props;
        
        if(this.props.buttons) {
            var linkButtons = 
                <div className="button-wrapper">
                    {
                        Object.keys(buttons).map(key => (
                            buttons[key].url ? (
                                <Link key={key} to={ buttons[key].url }>
                                    <button type="button">
                                        { key }
                                    </button>
                                </Link>
                            )
                                :
                            (
                                <button key={key} type="button" onClick={buttons[key].action}>
                                    { key }
                                </button>
                            )
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