import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import Button from "@material-ui/core/Button";

export class Header extends React.PureComponent {
    render() {
        const { buttons } = this.props;

        if(buttons) {
            var linkButtons =
                <div className="button-wrapper">
                    {
                        Object.keys(buttons).map(key => (
                            buttons[key].url ? (
                                <Link key={key} to={ buttons[key].url }>
                                    <Button variant="contained" color="primary" disableElevation>
                                        { key }
                                    </Button>
                                </Link>
                            ) : (
                                <Button variant="contained" color="primary" disableElevation key={key} type="button" onClick={buttons[key].action}>
                                    { key }
                                </Button>
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