import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { TopBar } from "../components/TopBar";
import { useForgotPasswordMutation } from "../generated/graphql";
import { useHistory } from "react-router-dom";

export const ForgotPassword: React.FC = () => {
  const [complete, setComplete] = useState<boolean>(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  const router = useHistory();
  return (
    <TopBar>
      <Box>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await forgotPassword({
              email: values.email,
            });
            setComplete(true);
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            handleChange,
            isSubmitting,
            values,
          }) => (
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <Container maxWidth="sm" style={{ marginTop: 30 }}>
                <Typography variant="h4">Forgot Password</Typography>
                <Form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    name="email"
                    placeholder="E-mail"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    label="e-mail"
                    variant="outlined"
                    type="text"
                  />
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                  >
                    <Button
                      size="large"
                      disabled={isSubmitting}
                      type="submit"
                      color="primary"
                      variant="contained"
                    >
                      forgot password
                    </Button>
                  </Box>
                </Form>
              </Container>
            </Box>
          )}
        </Formik>
      </Box>
      <Dialog open={complete} onClose={() => router.push("/login")}>
        <DialogTitle>{"Forgot Password"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If an account with that e-mail exists, we sent you an email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.push("/login")} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </TopBar>
  );
};
