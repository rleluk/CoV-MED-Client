import React from "react";
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";

export class SignUpPage extends React.PureComponent {
    constructor(props) {
        super(props);
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
            .then(res => res.json())
            .then(json => {
                console.log(json);
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
                <div className="content">
                    <form onSubmit={this.handleSubmit}>
                        <label> Email: </label>
                        <input type='text' name='email' onChange={this.handleChange} required/>
                        <label> Hasło: </label>
                        <input type='password' name='password' onChange={this.handleChange} required/>
                        <label> Imię: </label>
                        <input type='text' name='firstName' onChange={this.handleChange} required/>
                        <label> Nazwisko: </label>
                        <input type='text' name='lastName' onChange={this.handleChange} required/>
                        <label> Numer telefonu: </label>
                        <input type='text' name='phoneNumber' onChange={this.handleChange} required/>
                        <label> PESEL: </label>
                        <input type='text' name='pesel' onChange={this.handleChange} required/>
                        <button type='submit'> Sign Up </button>
                    </form>
                </div>
            </div>
        );
    }
};