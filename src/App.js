import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import NotFoundPage from "./pages/404"

class App extends React.PureComponent {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/signin" component={SignInPage}/>
        <Route exact={true} path="/signup" component={SignUpPage}/>
        <Route exact={true} path="/404/" component={NotFoundPage}></Route>
        <Redirect to="/404"/>
      </Switch>
    </BrowserRouter>;
  }
}

export default App;
