import {
  Box,
  Button,
  TextField,
  Link,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import {
  useLoginMutation,
  useSendValidationEmailMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

export const Login: React.FC = () => {
  const router = useHistory();
  const [, login] = useLoginMutation();
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [, sendValidationEmail] = useSendValidationEmailMutation();
  return (
    <TopBar>
      <Box>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login.errors) {
              //login error
              if (response.data.login.errors[0].field === "emailValidation") {
                setUsernameOrEmail(values.usernameOrEmail);
                setEmailValidationError(true);
              }
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              //login successfull
              router.push("/dashboard"); //redirect to landing page
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleSubmit,
            handleChange,
            isSubmitting,
            touched,
            values,
          }) => (
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <Container maxWidth="sm" style={{ marginTop: 30 }}>
                <Typography variant="h4">Sign in</Typography>
                <Form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(
                      touched.usernameOrEmail && errors.usernameOrEmail
                    )}
                    helperText={
                      touched.usernameOrEmail && errors.usernameOrEmail
                    }
                    margin="normal"
                    name="usernameOrEmail"
                    placeholder="Username or E-mail"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.usernameOrEmail}
                    label="username or email"
                    variant="outlined"
                    type="text"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    margin="normal"
                    name="password"
                    placeholder="Password"
                    fullWidth
                    label="password"
                    type="password"
                    variant="outlined"
                  />
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <RouterLink to="/forgot-password">
                      <Link variant="subtitle1">Forgot Password?</Link>
                    </RouterLink>
                    <Button
                      size="large"
                      disabled={isSubmitting}
                      type="submit"
                      color="primary"
                      variant="contained"
                    >
                      sign in
                    </Button>
                  </Box>
                </Form>
              </Container>
            </Box>
          )}
        </Formik>
      </Box>
      <Dialog
        open={emailValidationError}
        onClose={() => setEmailValidationError(false)}
      >
        <DialogTitle>{"PLEASE VALIDATE YOUR E-MAIL"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A validation e-mail is sent to your e-mail. Please validate your
            e-mail before logging in. If you do not have any e-mail please check
            your spam folder. You can click below button to re-send validation
            e-mail if you do not have one.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              await sendValidationEmail({
                usernameOrEmail: usernameOrEmail,
              });
              setEmailValidationError(false);
            }}
            color="primary"
          >
            not have any e-mail
          </Button>
          <Button
            onClick={() => setEmailValidationError(false)}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </TopBar>
  );
};
