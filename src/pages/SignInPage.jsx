import React from "react";
import history from "../_services/history.service";
import { authenticationService } from "../_services/authentication.service"

export class SignInPage extends React.PureComponent {
    constructor(props) {
        super(props);

        // if(localStorage.getItem("authToken") && localStorage.getItem("userType")) {
        //     this.redirectToHomepage(localStorage.getItem("userType"));
        // } else {
        //     authenticationService.logout();
        // }

        this.state = {
            username: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
 
    redirectToHomepage(userType) {
        switch(userType) {
            case "Client": 
                history.push("/clients/homepage");
                break;
            case "Receptionist":
                history.push("/receptionists/homepage");
                break;
            case "Doctor":
                history.push("/doctors/homepage");
                break;
            default:
                throw new Error("Undefined user type.");
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const dataToSend = {
            username: this.state.username,
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
                        this.redirectToHomepage(json.userType);
                        break;
                    case 400:
                        console.log("Wrong username or password.");
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
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' name='username' onChange={this.handleChange}/>
                <input type='password' name='password' onChange={this.handleChange}/>
                <button type='submit'>Sign In</button>
            </form>
        );
    }
};