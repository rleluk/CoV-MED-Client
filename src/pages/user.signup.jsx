import React from "react";
import Button from "@material-ui/core/Button";
import { withAlert } from "react-alert";

import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import { authenticationService } from "../_services"

class SignUpPage extends React.PureComponent {
    constructor(props) {
        super(props);

        if(authenticationService.checkAuthorization()) {
            authenticationService.redirectToHomepage(localStorage.getItem("userType"));
        } 
        
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            pesel: ""
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
 
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const dataToSend = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            pesel: this.state.pesel
        };

        fetch(process.env.REACT_APP_SERVER + "/clients/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(res => {
            switch(res.status) {
                case 200:
                    this.props.alert.show("Rejestracja przebiegła pomyślnie!", { type: "success" });
                    break;
                case 400:
                    this.props.alert.show("Nieprawidłowe dane!", { type: "error" });
                    break;
                default:
                    throw new Error(res.error);
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const buttons = {
            Logowanie: { url: "/signin" }
        }

        const urls = {
            "Strona główna": { url: "/" },
            "Lekarze": { url: "/doctors" },
            "Badania": { url: "/examinations" }
        }

        return (
            <div>
                <Header buttons={buttons}/>
                <SideMenu urls={urls}/>
                <div className="content-with-margin">
                    <div className="page-header"> Rejestracja </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="label-input">
                            <label> Email: </label>
                            <input type='text' name='email' onChange={this.handleChange} required/>
                        </div>
                        <div className="label-input">
                            <label> Hasło: </label>
                            <input type='password' name='password' onChange={this.handleChange} required/>
                        </div>
                        <div className="label-input">
                            <label> Imię: </label>
                            <input type='text' name='firstName' onChange={this.handleChange} required/>
                        </div>
                        <div className="label-input">
                            <label> Nazwisko: </label>
                            <input type='text' name='lastName' onChange={this.handleChange} required/>
                        </div>
                        <div className="label-input">
                            <label> Numer telefonu: </label>
                            <input type='text' name='phoneNumber' onChange={this.handleChange} required/>
                        </div>
                        <div className="label-input">
                            <label> PESEL: </label>
                            <input type='text' name='pesel' onChange={this.handleChange} required/>
                        </div>
                        <Button variant="contained" type='submit' style={{marginLeft:180}}> Zarejestruj się </Button>
                    </form>
                </div>
            </div>
        );
    }
};

export default withAlert()(SignUpPage);
