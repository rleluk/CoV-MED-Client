import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { authenticationService } from './_services/authentication.service';

// pages
import { HomePage } from "./pages/HomePage"
import { SignInPage } from "./pages/SignInPage"
import { SignUpPage } from "./pages/SignUpPage"
import { NotFoundPage } from "./pages/404"
import { UserHomePage } from "./pages/UserHomePage"
import { PrivateRoute } from "./components/PrivateRoute";

class App extends React.PureComponent {
  componentDidMount() {
    authenticationService.currentUser.subscribe(user => this.setState({ currentUser: user }));
  }

  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/signin" component={SignInPage}/>
        <Route exact={true} path="/signup" component={SignUpPage}/>
        <Route exact={true} path="/404/" component={NotFoundPage}/>
        <PrivateRoute exact={true} path="/users/homepage" component={UserHomePage}/>
        <Redirect to="/404"/>
      </Switch>
    </BrowserRouter>;
  }
}

export default App;
