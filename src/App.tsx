import React from "react";
import { Redirect, Route, Router, Switch } from "react-router";
import { ChangePassword } from "./pages/change-password";
import { Dashboard } from "./pages/dashboard";
import { ForgotPassword } from "./pages/forgot-password";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ValidateEmail } from "./pages/validate-email";
import { createBrowserHistory } from "history";
import { createClient, Provider } from "urql";
import { createUrqlClient } from "./utils/createUrqlClient";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./utils/theme";
import { Table } from "./pages/table";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider value={createClient(createUrqlClient())}>
        <Router history={createBrowserHistory()}>
          <Switch>
            <>
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
              <Route path="/validate-email">
                <ValidateEmail />
              </Route>
              <Route path="/forgot-password">
                <ForgotPassword />
              </Route>
              <Route path="/change-password">
                <ChangePassword />
              </Route>
              <Route path="/table">
                <Table />
              </Route>
            </>
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
