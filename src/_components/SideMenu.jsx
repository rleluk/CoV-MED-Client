import React from "react";
import { Link } from "react-router-dom";
import "./SideMenu.scss";
import Icon from "../images/organs.png";

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
                                    { urls[key].url ? (
                                        <Link to={urls[key].url}>
                                            { key }
                                        </Link>
                                    ) : (
                                        <Link to="#" onClick={urls[key].action}>
                                            { key }
                                        </Link>
                                    )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
        }

        return (
            <div className="sideMenu">
                <img alt="" src={Icon} />
                {links}
                <div className="footer">
                    (800) CoV-MED <br/>
                    info@cov-med.com
                </div>
            </div>
        );
    }
};