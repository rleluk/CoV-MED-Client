import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./_components/PrivateRoute";
import history from "./_services/history.service";

// pages
import { HomePage } from "./pages/HomePage"
import { SignInPage } from "./pages/SignInPage"
import { SignUpPage } from "./pages/SignUpPage"
import { NotFoundPage } from "./pages/404"
import { ClientHomePage } from "./pages/ClientHomePage"
import { ReceptionistHomePage } from "./pages/ReceptionistHomePage"
import { DoctorHomePage } from "./pages/DoctorHomePage"


class App extends React.PureComponent {
  render() {
    return <Router history={history}>
      <Switch>
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/signin" component={SignInPage}/>
        <Route exact={true} path="/signup" component={SignUpPage}/>
        <Route exact={true} path="/404/" component={NotFoundPage}/>
        <PrivateRoute exact={true} path="/clients/homepage" component={ClientHomePage}/>
        <PrivateRoute exact={true} path="/receptionists/homepage" component={ReceptionistHomePage}/>
        <PrivateRoute exact={true} path="/doctors/homepage" component={DoctorHomePage}/>
        <Redirect to="/404"/>
      </Switch>
    </Router>;
  }
}

export default App;
