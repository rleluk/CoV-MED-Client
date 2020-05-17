import React from "react";
import { Link } from "react-router-dom";
import "../styles/SideMenu.scss";

export class SideMenu extends React.PureComponent {
    render() {
        const { urls } = this.props;
        
        if(urls) {
            var links = 
                <div className="link-wrapper">
                    <ul>
                        {
                            Object.keys(urls).map(key => (
                                <li key={key}>
                                    <Link to={urls[key].url}>
                                        { key }
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
        }

        return (
            <div className="sideMenu">
                {links}
                <div className="footer"> footer info </div>
            </div>
        );
    }
};