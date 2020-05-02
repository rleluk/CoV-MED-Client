import React from "react";

export default class SignUpPage extends React.PureComponent {
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

        fetch("https://cov-med.herokuapp.com/users/register", {
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
                <input type='text' name='username' onChange={this.handleChange}/>
                <label> Password: </label>
                <input type='password' name='password' onChange={this.handleChange}/>
                <label> First name: </label>
                <input type='text' name='firstName' onChange={this.handleChange}/>
                <label> Last name: </label>
                <input type='text' name='lastName' onChange={this.handleChange}/>
                <button type='submit'>Sign Up</button>
            </form>
        );
    }
};