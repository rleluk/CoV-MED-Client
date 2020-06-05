import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./_components/PrivateRoute";
import history from "./_services/history.service";
import "./styles/BasePage.scss";

import { 
  NotFoundPage,
  ExaminationHistoryPage,
  ExaminationResultsPage,
  ReceptionistHomePage,
  DoctorExaminationHistoryPage,
  DoctorExaminationResultsPage,
  ReceptionistPatientsPage,
  DoctorHomePage,
  DoctorPatientsPage
} from './pages';

import PostponeAppointmentPage from "./pages/receptionist.postpone_appointment";
import ReceptionistAppointmentsPage from "./pages/receptionist.appointments";
import DoctorsPage from "./pages/user.doctors";
import ExaminationsPage from "./pages/user.examinations";
import HomePage from "./pages/user.homepage";
import DoctorAppointmentsPage from "./pages/doctor.appointments";
import NewAppointmentPage from "./pages/client.new_appointment";
import ClientHomePage from "./pages/client.homepage";
import SignInPage from "./pages/user.signin";
import SignUpPage from "./pages/user.signup";

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
        <PrivateRoute exact={true} path="/client/homepage" component={ClientHomePage}/>
        <PrivateRoute exact={true} path="/client/new-appointment" component={NewAppointmentPage}/>
        <PrivateRoute exact={true} path="/client/examination-history" component={ExaminationHistoryPage}/>
        <PrivateRoute exact={true} path="/client/examination-results" component={ExaminationResultsPage}/>
        <PrivateRoute exact={true} path="/receptionist/homepage" component={ReceptionistHomePage}/>
        <PrivateRoute exact={true} path="/receptionist/appointments" component={ReceptionistAppointmentsPage}/>
        <PrivateRoute exact={true} path="/receptionist/patients" component={ReceptionistPatientsPage}/>
        <PrivateRoute exact={true} path="/receptionist/postpone-appointment" component={PostponeAppointmentPage}/>
        <PrivateRoute exact={true} path="/doctor/homepage" component={DoctorHomePage}/>
        <PrivateRoute exact={true} path="/doctor/appointments" component={DoctorAppointmentsPage}/>
        <PrivateRoute exact={true} path="/doctor/patients" component={DoctorPatientsPage}/>
        <PrivateRoute exact={true} path="/doctor/client/examination-history" component={DoctorExaminationHistoryPage}/>
        <PrivateRoute exact={true} path="/doctor/client/examination-results" component={DoctorExaminationResultsPage}/>
        <Redirect to="/404"/>
      </Switch>
    </Router>;
  }
}

export default App;
