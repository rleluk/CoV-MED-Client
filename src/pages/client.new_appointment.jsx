import React from "react";
import { URL } from "../menuURLs";
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import { authenticationService } from "../_services/authentication.service";

export class NewAppointmentPage extends React.PureComponent {
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
    
    async fetchData(endPoint) {
        let res = await fetch(process.env.REACT_APP_SERVER + endPoint, { 
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authenticationService.authToken}`,
            }
        });

        if(res.status === 200) {
            let data = await res.json();
            return data;
        }
    }

    async componentDidMount() {
        let data = await this.fetchData("/clinics/cities");
        this.setState({ cities: data });
    }

    getAvailableTime(notAvailableTime) {
        let availableTime = []
        for(let i = 8; i <= 15; i++) {
            availableTime.push(i + ":00");
            availableTime.push(i + ":30");
        }
        return availableTime;
    }

    async handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

        let data;
        switch(event.target.name) {
            case "city":
                data = await this.fetchData(`/clinics/${event.target.value}/streets`);
                this.setState({ streets: data });
                break;
            case "street":
                data = await this.fetchData(`/clinics/${this.state.city}/${event.target.value}/services`);
                this.setState({ services: data });
                break;
            case "service":
                data = await this.fetchData(`/clinics/${this.state.city}/${this.state.street}/${event.target.value}/doctors`);
                this.setState({ doctors: data });
                break;
            case "date":
                if(this.state.city && this.state.street && this.state.doctor) {
                    data = await this.fetchData(`/clinics/${this.state.city}/${this.state.street}/${this.state.doctor}/not-available-hours?date=${event.target.value}`);
                    let availableTime = this.getAvailableTime(data);
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
            date: new Date(this.state.date + " " + this.state.time).toISOString()
        };

        fetch(process.env.REACT_APP_SERVER + "/clients/make-visit", { 
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authenticationService.authToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateOptions(data, container) {
        if(data) {
            container.push(<option key={"default" + data} hidden disabled selected value> Wybierz </option>);
            data.forEach(element => { 
                container.push(<option key={element} value={element}> {element} </option>);
            })
        }
    }

    render() {
        const { cities, streets, services, doctors, times } = this.state;

        const buttons = {
            "Panel pacjenta": { url: "/client/homepage" },
            Wyloguj: { action: authenticationService.logout }
        }

        const urls = URL.client;

        let cityOptions = [], streetOptions = [], serviceOptions = [], doctorOptions = [], timeOptions = [];
        this.updateOptions(cities, cityOptions);
        this.updateOptions(streets, streetOptions);
        this.updateOptions(services, serviceOptions);
        this.updateOptions(times, timeOptions);

        if(doctors) {
            doctorOptions.push(<option key={"null" + doctors} hidden disabled selected value> Wybierz </option>);
            doctors.forEach(element => { 
                doctorOptions.push(<option key={element} value={element.email}> {element.firstName + " " + element.lastName} </option>);
            })
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
                        <button type='submit'> Umów wizytę </button>
                    </form>    
                </div>
            </div>
        );
    }
};