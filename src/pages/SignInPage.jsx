import React from "react";

export default class SignInPage extends React.PureComponent {
    constructor(props) {
        super(props);
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

        const dataToSend = {
            username: this.state.username,
            password: this.state.password
        };

        fetch("https://cov-med.herokuapp.com/users/authenticate", {
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
                <input type='text' name='username' onChange={this.handleChange}/>
                <input type='password' name='password' onChange={this.handleChange}/>
                <button type='submit'>Sign In</button>
            </form>
        );
    }
};