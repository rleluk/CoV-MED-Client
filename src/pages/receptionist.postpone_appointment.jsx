import React from "react";
import { withAlert } from "react-alert";

import history from "../_services/history.service";
import { Header } from "../_components/Header";
import { authenticationService, fetchService, dateService } from "../_services";

class PostponeAppointmentPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            times: [],
            date: "",
            time: ""
        }
        
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        // console.log(this.props)
    }

    getAvailableTime(notAvailableTime) {
        notAvailableTime = notAvailableTime.map(el => {
            el = new Date(el);
            return el.getHours() + ":" + ((el.getMinutes() === 0) ? "00" : "30");
        });
        
        let availableTime = [];
        for(let i = 8; i <= 15; i++) {
            availableTime.push(i + ":00");
            availableTime.push(i + ":30");
        }

        availableTime = availableTime.filter((el) => !notAvailableTime.includes(el));
        return availableTime;
    }

    async handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    //     const dataToSend = {
    //         doctor: {
    //             email: this.state.email
    //         },
    //         oldDate: this.state.oldDate,
    //         newDate: new Date(this.state.date + " " + this.state.time).toISOString()
    //     };

    //     fetch(process.env.REACT_APP_SERVER + "/clients/make-visit", { 
    //         method: "POST",
    //         headers: {
    //             "Authorization": `Bearer ${authenticationService.authToken}`,
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(dataToSend)
    //     })
    //     .then(res => {
    //         if(res.status === 200) {
    //             this.props.alert.show("Wizyta została pomyślnie przełożona!", { type: "success" });
    //         } else {
    //             this.props.alert.show("Coś poszło nie tak...", { type: "error" });
    //         }
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     });
    }

    render() {
        const buttons = {
            "Panel recepcjonisty": { url: "/receptionist/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        if(!this.props.location.state) {
            history.goBack();
        } else {
            var { clinic, doctor, service, date } = this.props.location.state.visit;
            var { city, street } = clinic;

            date = new Date(date);
            var oldDate = dateService.getFullDate(date, "-", "YYYY-MM-DD");
            var oldTime = dateService.getFullTime(date);

            var doctorName = doctor.firstName + " " + doctor.lastName;
        }
        
        return (
            <div>
                <Header buttons={buttons}/>
                <div className="content">
                    <div className="page-header"> Przełóż wizytę </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="label-input">
                            <label> Miasto: </label>
                            <select name="city" disabled>
                                <option value={city}> {city} </option>
                            </select>
                        </div>
                        <div className="label-input">
                            <label> Placówka: </label>
                            <select name="street" disabled>
                                <option value={street}> {street} </option>
                            </select>
                        </div>
                        <div className="label-input">
                            <label> Usługa: </label>
                            <select name="service" disabled>
                                <option value={service}> {service} </option>
                            </select>
                        </div>
                        <div className="label-input">
                            <label> Lekarz: </label>
                            <select name="doctor" disabled>
                                <option value={doctorName}> {doctorName} </option>
                            </select>
                        </div>
                        <div className="label-input">
                            <label> Data: </label>
                            <input type='date' name='date' value={oldDate} onChange={this.handleChange}/>
                        </div>
                        <div className="label-input">
                            <label> Godzina: </label>
                            <select name="time" onChange={this.handleChange}>
                                <option value={oldTime}> {oldTime} </option>
                            </select>
                        </div>
                        <button type='submit'> Przełóż wizytę </button>
                    </form>    
                </div>
            </div>
        );
    }
};

export default withAlert()(PostponeAppointmentPage);