import React from "react";
import { Link } from "react-router-dom";

export class HomePage extends React.PureComponent {
    render() {
        return (
            <div>
                <h1>Hi</h1>
                <Link to="/signin"> Strona logowania </Link>
                <br/>
                <Link to="/signup"> Strona rejestracji </Link>
            </div>
        );
    }
};