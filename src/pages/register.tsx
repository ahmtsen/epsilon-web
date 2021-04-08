import DateFnsUtils from "@date-io/moment";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { TopBar } from "../components/TopBar";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
export const Register: React.FC = () => {
  const [birthday, setBirthday] = useState(new Date());
  const router = useHistory();
  const [, register] = useRegisterMutation();
  return (
    <TopBar>
      <Box>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            isSmoker: "no",
            hasCoughSickness: "no",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              options: {
                username: values.username,
                password: values.password,
                email: values.email,
                birthday: birthday?.toISOString(),
                isSmoker: values.isSmoker === "yes",
                hasCoughSickness: values.hasCoughSickness === "yes",
              },
            });
            if (response.data?.register.errors) {
              //register error
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              //register successfull
              Swal.fire({
                icon: "info",
                title: "Registration Successful",
                text: ` You are successfuly registered. A validation e-mail is sent your
                email. Please validate your e-mail before logging in.`,
                footer: "Epsilon Inc. COVID-19 Symptom Tracking",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push("/login");
                }
              });
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
                <Typography variant="h4">Register</Typography>
                <Form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                    margin="normal"
                    name="username"
                    placeholder="Username"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    label="username"
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
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    margin="normal"
                    name="email"
                    placeholder="E-mail"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    label="email"
                    variant="outlined"
                    type="text"
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableFuture
                      animateYearScrolling
                      InputAdornmentProps={{ position: "start" }}
                      margin="normal"
                      variant="inline"
                      inputVariant="outlined"
                      fullWidth
                      id="birthday"
                      label="birthday"
                      format="DD/MM/yyyy"
                      value={birthday}
                      onChange={(e) =>
                        setBirthday(new Date(e?.toISOString() as string))
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <FormControl
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormLabel component="label">Do you smoke?</FormLabel>
                    <RadioGroup
                      name="isSmoker"
                      value={values.isSmoker}
                      onChange={handleChange}
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                      }}
                    >
                      <Box>
                        <FormControlLabel
                          value="yes"
                          control={<Radio color="primary" />}
                          label="Yes"
                        />
                      </Box>
                      <Box>
                        <FormControlLabel
                          value="no"
                          control={<Radio color="primary" />}
                          label="No"
                        />
                      </Box>
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormLabel component="label">
                      Do you have any sickness related to cough?
                    </FormLabel>
                    <RadioGroup
                      name="hasCoughSickness"
                      value={values.hasCoughSickness}
                      onChange={handleChange}
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                      }}
                    >
                      <Box>
                        <FormControlLabel
                          value="yes"
                          control={<Radio color="primary" />}
                          label="Yes"
                        />
                      </Box>
                      <Box>
                        <FormControlLabel
                          value="no"
                          control={<Radio color="primary" />}
                          label="No"
                        />
                      </Box>
                    </RadioGroup>
                  </FormControl>

                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    marginTop={1}
                  >
                    <Button
                      size="large"
                      disabled={isSubmitting}
                      type="submit"
                      color="primary"
                      variant="contained"
                    >
                      register
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
