import React from "react";

export class SignUpPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
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
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
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
        return (
            <form onSubmit={this.handleSubmit}>
                <label> Username: </label>
                <input type='text' name='username' onChange={this.handleChange} required/>
                <label> Password: </label>
                <input type='password' name='password' onChange={this.handleChange} required/>
                <label> First name: </label>
                <input type='text' name='firstName' onChange={this.handleChange} required/>
                <label> Last name: </label>
                <input type='text' name='lastName' onChange={this.handleChange} required/>
                <button type='submit'>Sign Up</button>
            </form>
        );
    }
};