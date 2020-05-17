import React from "react";
import { Header } from "../_components/Header";
import { SideMenu } from "../_components/SideMenu";
import "../styles/HomePage.scss";

export class HomePage extends React.PureComponent {
    render() {
        const buttons = {
            Rejestracja: { url: "/signup" },
            Logowanie: { url: "/signin" }
        }

        const urls = {
            "Strona główna": { url: "/" },
            "Lekarze": { url: "/doctors" },
            "Badania": { url: "/examinations" }
        }

        return (
            <div>
                <Header buttons={buttons}/>
                <SideMenu urls={urls}/>
                <div className="content">
                    Aktualności
                </div>
            </div>
        );
    }
};