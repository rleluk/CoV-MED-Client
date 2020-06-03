import React from "react";
import { URL } from "../menuURLs";
import { InfoBox } from "../_components/InfoBox";
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import { withAlert } from "react-alert";
import { authenticationService } from "../_services/authentication.service"

class HomePage extends React.PureComponent {
    render() {
        const buttons = authenticationService.checkAuthorization() ? { 
                Wyloguj: { action: authenticationService.logout }
            } : { 
                Rejestracja: { url: "/signup" }, 
                Logowanie: { url: "/signin" } 
            };
        
        
        let urls = URL.get(authenticationService.userType);
        if(authenticationService.userType === "Client") {
            urls["Odbyj e-wizytę"] = {
                action: () => this.props.alert.show("Brak implementacji odbywania wizyt", { type: "error" })
            }
        }

        let lorem_ipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Donec fringilla libero non ipsum malesuada, ac feugiat augue gravida. 
            Curabitur nec libero vitae arcu dignissim sollicitudin eu quis mauris.
            Praesent et efficitur odio. Suspendisse potenti. Vestibulum facilisis ac ex vitae pretium.
            Fusce turpis orci, aliquam id tortor a, molestie consequat elit. 
            Morbi dignissim lorem et velit blandit, a tincidunt turpis tempor. 
            Phasellus quis auctor erat. Suspendisse potenti. Vivamus nec pulvinar nibh. 
            Curabitur consectetur in odio a efficitur. In vel luctus sem.`;

        return (
            <div>
                <Header buttons={buttons}/> 
                <SideMenu urls={urls}/>
                <div className="content-with-margin">
                    <div className="page-header"> Aktualności </div>
                    <div className="data-container">
                        <InfoBox header="Nagłówek" data={ lorem_ipsum }/>
                        <InfoBox header="Nagłówek" data={ lorem_ipsum }/>
                        <InfoBox header="Nagłówek" data={ lorem_ipsum }/>
                        <InfoBox header="Nagłówek" data={ lorem_ipsum }/>
                        <InfoBox header="Nagłówek" data={ lorem_ipsum }/>
                        <InfoBox header="Nagłówek" data={ lorem_ipsum }/>
                        <InfoBox header="Nagłówek" data={ lorem_ipsum }/>
                    </div>
                </div>
            </div>
        );
    }
};

export default withAlert()(HomePage);