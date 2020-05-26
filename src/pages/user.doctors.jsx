import React from "react";
import { URL } from "../menuURLs";
import { Header } from "../_components/Header";
import { InfoBox } from "../_components/InfoBox";
import { SideMenu } from "../_components/SideMenu";
import { authenticationService } from "../_services/authentication.service"

export class DoctorsPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            doctors: []
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_SERVER + "/doctors", { method: "GET"})
            .then(res => res.json())
            .then(json => {
                this.setState({ doctors: json });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const buttons = authenticationService.checkAuthorization() ? { 
                Wyloguj: { action: authenticationService.logout }
            } : { 
                Rejestracja: { url: "/signup" }, 
                Logowanie: { url: "/signin" } 
            };

        let urls = URL.get(authenticationService.userType);
        
        let { doctors } = this.state;
        if(doctors) {
            var infoBoxes = [];
            doctors.forEach(element => {
                let header = element.firstName + " " + element.lastName;
                let data = [];
                data.push(<h3 key={element.email + "_specialization"}> Specjalizacja: { element.specialization } </h3>);
                data.push(<h3 key={element.email + "_phoneNumber"}> { "+48 " + element.phoneNumber } </h3>);
                data.push(<h3 key={element.email}> { element.email } </h3>);
                infoBoxes.push(<InfoBox key={element} header={header} data={data}/>);
            })
        }
        
        return (
            <div>
                <Header buttons={buttons}/>
                <SideMenu urls={urls}/>
                <div className="content-with-margin">
                    <div className="page-header"> Nasi specjaliści </div>
                    <div className="data-container">
                        { infoBoxes }
                    </div>
                </div>
            </div>
        );
    }
};