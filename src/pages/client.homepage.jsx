import React from "react";
import { withAlert } from "react-alert";

import { URL } from "../menuURLs";
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import { authenticationService } from "../_services";

class ClientHomePage extends React.PureComponent {
    render() {
        const buttons = {
            Wyloguj: { 
                action: authenticationService.logout 
            }
        }

        const urls = URL.client;
        urls["Odbyj e-wizytę"] = {
            action: () => this.props.alert.show("Brak implementacji odbywania wizyt", { type: "error" })
        }
        console.log(authenticationService.userName)
        return (
            <div>
                <Header buttons={buttons}/>
                <SideMenu urls={urls}/>
                <div className="content-with-margin">
                    <div className="page-header"> Panel pacjenta </div>
                    <div className="logged-as"> Zalogowany jako: { authenticationService.userName } </div>
                </div>
            </div>
        );
    }
};

export default withAlert()(ClientHomePage);