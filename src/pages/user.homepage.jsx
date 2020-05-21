import React from "react";
import { URL } from "../menuURLs";
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import { authenticationService } from "../_services/authentication.service"
import "../styles/HomePage.scss";

export class HomePage extends React.PureComponent {
    render() {
        const buttons = authenticationService.checkAuthorization() ? { 
                Wyloguj: { action: authenticationService.logout }
            } : { 
                Rejestracja: { url: "/signup" }, 
                Logowanie: { url: "/signin" } 
            };
        
        
        let urls = URL.get(authenticationService.userType);
        
        return (
            <div>
                <Header buttons={buttons}/> 
                <SideMenu urls={urls}/>
                <div className="content">
                    aktualności
                </div>
            </div>
        );
    }
};