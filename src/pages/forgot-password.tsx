import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { TopBar } from "../components/TopBar";
import { useForgotPasswordMutation } from "../generated/graphql";
import Swal from "sweetalert2";
export const ForgotPassword: React.FC = () => {
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
            Swal.fire({
              icon: "info",
              title: "Forgot Password",
              text: `If an account with that e-mail exists, we sent you an e-mail.`,
              footer: "Epsilon Inc. COVID-19 Symptom Tracking",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/login");
              }
            });
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
    </TopBar>
  );
};
