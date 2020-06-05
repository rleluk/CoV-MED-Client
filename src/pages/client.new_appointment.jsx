import React from "react";
import { withAlert } from "react-alert";

import { URL } from "../menuURLs";
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import { authenticationService, fetchService, dateService } from "../_services";
import Button from "@material-ui/core/Button";

class NewAppointmentPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            cities: [],
            streets: [],
            services: [],
            doctors: [],
            times: [],
            city: "",
            street: "",
            service: "",
            doctor: "",
            date: "",
            time: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        let data = await fetchService.getData("/clinics/cities");
        this.setState({ cities: data });
    }

    async handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

        let data;
        // eslint-disable-next-line
        switch(event.target.name) {
            case "city":
                data = await fetchService.getData(`/clinics/${event.target.value}/streets`);
                this.setState({ 
                    streets: data,
                    services: [], doctors: [], times: [],
                    doctor: "", date: "", time: "" 
                });
                break;
            case "street":
                data = await fetchService.getData(`/clinics/${this.state.city}/${event.target.value}/services`);
                this.setState({ 
                    services: data,
                    doctors: [], times: [],
                    date: "", time: ""  
                });
                break;
            case "service":
                data = await fetchService.getData(`/clinics/${this.state.city}/${this.state.street}/${event.target.value}/doctors`);
                this.setState({ 
                    doctors: data,
                    times: [],
                    time: ""  
                });
                break;
            case "date":
                if(this.state.city && this.state.street && this.state.doctor) {
                    data = await fetchService.getData(`/clinics/${this.state.city}/${this.state.street}/${this.state.doctor}/not-available-hours?date=${event.target.value}`);
                    let availableTime = dateService.getAvailableTime(data);
                    this.setState({ times: availableTime });
                }
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const dataToSend = {
            doctor: {
                email: this.state.doctor
            },
            clinic: {
                city: this.state.city,
                street: this.state.street
            },
            date: new Date(this.state.date + " " + this.state.time).toISOString(),
            service: this.state.service
        };

        fetch(process.env.REACT_APP_SERVER + "/clients/make-visit", { 
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authenticationService.authToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })
        .then(res => {
            if(res.status === 200) {
                this.props.alert.show("Wizyta została pomyślnie zarejestrowana!", { type: "success" });
                this.setState({
                    cities: [], streets: [], services: [], doctors: [], times: [],
                    city: "", street: "", service: "", doctor: "", date: "", time: ""
                })
            } else {
                this.props.alert.show("Coś poszło nie tak...", { type: "error" });
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateOptions(data, container) {
        if(!data) 
            return;

        if(data.length === 0) {
            container.push(<option key={"empty" + data} hidden disabled selected value> --- </option>);
            return;
        } 

        container.push(<option key={"default" + data} hidden disabled selected value> Wybierz </option>);
        data.forEach(element => { 
            container.push(<option key={element} value={element}> {element} </option>);
        });
    }

    render() {
        const { cities, streets, services, doctors, times } = this.state;

        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        const urls = URL.client;
        urls["Odbyj e-wizytę"] = {
            url: null,
            action: () => this.props.alert.show("Brak implementacji odbywania wizyt", { type: "error" })
        }

        let cityOptions = [], streetOptions = [], serviceOptions = [], doctorOptions = [], timeOptions = [];
        this.updateOptions(cities, cityOptions);
        this.updateOptions(streets, streetOptions);
        this.updateOptions(services, serviceOptions);
        this.updateOptions(times, timeOptions);

        if(doctors) {
            if(doctors.length === 0) 
                doctorOptions.push(<option key={"empty" + doctors} hidden disabled selected value> --- </option>);
            else {
                doctorOptions.push(<option key={"null" + doctors} hidden disabled selected value> Wybierz </option>);
                doctors.forEach(element => { 
                    doctorOptions.push(<option key={element} value={element.email}> {element.firstName + " " + element.lastName} </option>);
                })
            }
        }

        return (
            <div>
                <Header buttons={buttons}/>
                <SideMenu urls={urls}/>
                <div className="content-with-margin">
                    <div className="page-header"> Umów wizytę </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="label-input">
                            <label> Miasto: </label>
                            <select id="select-city" name="city" required onChange={this.handleChange}>
                                {cityOptions}
                            </select>
                        </div>
                        <div className="label-input">
                            <label> Placówka: </label>
                            <select id="select-street" name="street" required onChange={this.handleChange}>
                                {streetOptions}
                            </select>
                        </div>
                        <div className="label-input">
                            <label> Usługa: </label>
                            <select id="select-service" name="service" required onChange={this.handleChange}>
                                {serviceOptions}
                            </select>
                        </div>
                        <div className="label-input">
                            <label> Lekarz: </label>
                            <select id="select-doctor" name="doctor" required onChange={this.handleChange}>
                                {doctorOptions}
                            </select>
                        </div>
                        <div className="label-input">
                            <label> Data: </label>
                            <input type='date' name='date' required onChange={this.handleChange}/>
                        </div>
                        <div className="label-input">
                            <label> Godzina: </label>
                            <select name="time" required onChange={this.handleChange}>
                                {timeOptions}
                            </select>
                        </div>
                        <Button variant="contained" type='submit' style={{marginLeft:180}}> Umów wizytę </Button>
                    </form>    
                </div>
            </div>
        );
    }
};

export default withAlert()(NewAppointmentPage);