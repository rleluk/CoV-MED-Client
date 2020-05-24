import React from "react";
import { withAlert } from 'react-alert'
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import { authenticationService } from "../_services/authentication.service"

class SignInPage extends React.PureComponent {
    constructor(props) {
        super(props);

        if(authenticationService.checkAuthorization()) {
            authenticationService.redirectToHomepage(localStorage.getItem("userType"));
        } 

        this.state = {
            email: "",
            password: ""
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
            password: this.state.password
        };

        return fetch(process.env.REACT_APP_SERVER + "/users/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })
            .then(async res => {
                switch(res.status) {
                    case 200:
                        const json = await res.json();
                        console.log(json);
                        localStorage.setItem('authToken', json.token);
                        localStorage.setItem('userType', json.userType);
                        authenticationService.redirectToHomepage(json.userType);
                        break;
                    case 400:
                        this.props.alert.show("Nieprawidłowy email lub hasło.", { type: "error" });
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
            Rejestracja: { url: "/signup" },
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
                <div className="page-header"> Logowanie </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="label-input">
                            <label> Email: </label>
                            <input type='text' name='email' onChange={this.handleChange} required/>
                        </div>
                        <div className="label-input">
                            <label> Hasło: </label>
                            <input type='password' name='password' onChange={this.handleChange} required/>
                        </div>
                        <button type='submit'> Zaloguj się </button>
                    </form>    
                </div>
            </div>
        );
    }
};

export default withAlert()(SignInPage);