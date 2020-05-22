import React from "react";
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import { authenticationService } from "../_services/authentication.service"

export class SignInPage extends React.PureComponent {
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

        console.log(dataToSend)

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
                        console.log("Wrong email or password.");
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
                    <form onSubmit={this.handleSubmit}>
                        <label> Email: </label>
                        <input type='text' name='email' onChange={this.handleChange} required/>
                        <label> Hasło: </label>
                        <input type='password' name='password' onChange={this.handleChange} required/>
                        <button type='submit'>Sign In</button>
                    </form>    
                </div>
            </div>
        );
    }
};