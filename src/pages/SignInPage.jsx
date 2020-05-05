import React from "react";
import { authenticationService } from "../_services/authentication.service";

export class SignInPage extends React.PureComponent {
    constructor(props) {
        super(props);

        if (authenticationService.currentUserValue) { 
            this.props.history.push('/users/homepage');
        }

        this.state = {
            username: "",
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
        authenticationService.login(this.state.username, this.state.password);
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/users/homepage');
        }
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