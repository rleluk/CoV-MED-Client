import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./_components/PrivateRoute";
import history from "./_services/history.service";

import { 
  HomePage, 
  SignInPage,
  SignUpPage,
  NotFoundPage,
  ClientHomePage,
  ExaminationHistoryPage,
  ExaminationResultsPage,
  NewAppointmentPage,
  ClientAppointmentPage,
  ReceptionistHomePage,
  ReceptionistAppointmentsPage,
  ReceptionistPatientsPage,
  DoctorHomePage,
  DoctorAppointmentsPage,
  DoctorPatientsPage,
  DoctorsPage,
  ExaminationsPage
} from './pages';

class App extends React.PureComponent {
  render() {
    return <Router history={history}>
      <Switch>
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/doctors" component={DoctorsPage}/>
        <Route exact={true} path="/examinations" component={ExaminationsPage}/>
        <Route exact={true} path="/signin" component={SignInPage}/>
        <Route exact={true} path="/signup" component={SignUpPage}/>
        <Route exact={true} path="/404/" component={NotFoundPage}/>
        <PrivateRoute exact={true} path="/clients/homepage" component={ClientHomePage}/>
        <PrivateRoute exact={true} path="/clients/new-appointment" component={NewAppointmentPage}/>
        <PrivateRoute exact={true} path="/clients/appointment" component={ClientAppointmentPage}/>
        <PrivateRoute exact={true} path="/clients/examination-history" component={ExaminationHistoryPage}/>
        <PrivateRoute exact={true} path="/clients/examination-results" component={ExaminationResultsPage}/>
        <PrivateRoute exact={true} path="/receptionists/homepage" component={ReceptionistHomePage}/>
        <PrivateRoute exact={true} path="/receptionists/appointments" component={ReceptionistAppointmentsPage}/>
        <PrivateRoute exact={true} path="/receptionists/patients" component={ReceptionistPatientsPage}/>
        <PrivateRoute exact={true} path="/doctors/homepage" component={DoctorHomePage}/>
        <PrivateRoute exact={true} path="/doctors/appointments" component={DoctorAppointmentsPage}/>
        <PrivateRoute exact={true} path="/doctors/patients" component={DoctorPatientsPage}/>
        <Redirect to="/404"/>
      </Switch>
    </Router>;
  }
}

export default App;
