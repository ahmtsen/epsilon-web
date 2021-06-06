import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from "history";
import React from "react";
import { Redirect, Route, Router, Switch } from "react-router";
import { createClient, Provider } from "urql";
import PageNotFound from "./pages/404";
import { ChangePassword } from "./pages/change-password";
import { Dashboard } from "./pages/dashboard";
import { ForgotPassword } from "./pages/forgot-password";
import { Login } from "./pages/login";
import { Questionnaire } from "./pages/questionnaire";
import { Register } from "./pages/register";
import { Table } from "./pages/table";
import { ValidateEmail } from "./pages/validate-email";
import { createUrqlClient } from "./utils/createUrqlClient";
import theme from "./utils/theme";
import { Notifications } from "./pages/notifications";
import { Profile } from "./pages/profile";
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider value={createClient(createUrqlClient())}>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/validate-email/:token">
              <ValidateEmail />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/change-password/:token">
              <ChangePassword />
            </Route>
            <Route path="/table">
              <Table />
            </Route>
            <Route path="/questionnaire">
              <Questionnaire />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
