import React from "react";
import { withAlert } from "react-alert";

import history from "../_services/history.service";
import { Header } from "../_components/Header";
import { authenticationService, fetchService, dateService } from "../_services";

class PostponeAppointmentPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            doctorName: "",
            doctorEmail: "",
            clientEmail: "",
            service: "",
            city: "",
            street: "",
            oldDate: "",
            date: "",
            time: "",
            times: []
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { clinic, doctor, service } = this.props.location.state.visit;
        const { city, street } = clinic;
        const { clientEmail } = this.props.location.state;
        const oldDate = this.props.location.state.visit.date;

        const doctorName = doctor.firstName + " " + doctor.lastName;
        const date = dateService.getFullDate(new Date(oldDate), "-", "YYYY-MM-DD");

        await this.setState({ 
            city: city, 
            street: street, 
            clientEmail: clientEmail,
            doctorName: doctorName, 
            doctorEmail: doctor.email,
            service: service, 
            oldDate: oldDate,
            date: date
        });

        this.updateDate(date);    
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

        if(event.target.name === "date") {
            this.updateDate(event.target.value);
        }
    }

    async updateDate(date) {
        const { city, street, doctorEmail } = this.state;
        if(city && street && doctorEmail) {
            let data = await fetchService.getData(`/clinics/${city}/${street}/${doctorEmail}/not-available-hours?date=${date}`);
            let availableTime = dateService.getAvailableTime(data);
            this.setState({ times: availableTime });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const dataToSend = {
            client: {
                email: this.state.clientEmail
            },
            oldDate: this.state.oldDate,
            newDate: new Date(this.state.date + " " + this.state.time).toISOString()
        };

        const res = await fetchService.putData("/receptionists/postpone-visit", dataToSend);

        if(res) {
            this.props.alert.show("Wizyta została pomyślnie przełożona!", { type: "success" });
            history.goBack();
        } else {
            this.props.alert.show("Coś poszło nie tak...", { type: "error" });
        }
    }

    render() {
        const buttons = {
            "Panel recepcjonisty": { url: "/receptionist/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        if(!this.props.location.state) {
            history.goBack();
        } else {
            var { city, street, service, doctorName, date, times } = this.state;

            var timeOptions = [];
            if(times.length === 0) {
                timeOptions.push(<option key={"empty" + times} hidden disabled selected value> --- </option>);
            } else {
                timeOptions.push(<option key={"default" + times} hidden disabled selected value> Wybierz </option>);
                times.forEach(element => { 
                    timeOptions.push(<option key={element} value={element}> {element} </option>);
                });
            }
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
                            <input type='date' name='date' defaultValue={date} required onChange={this.handleChange}/>
                        </div>
                        <div className="label-input">
                            <label> Godzina: </label>
                            <select name="time" required onChange={this.handleChange}>
                                { timeOptions }
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