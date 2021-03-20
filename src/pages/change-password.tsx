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
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { TopBar } from "../../src/components/TopBar";
import { useChangePasswordMutation } from "../../src/generated/graphql";
import { toErrorMap } from "../../src/utils/toErrorMap";

export const ChangePassword: React.FC = () => {
  const router = useHistory();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  const { token } = useParams() as {
    token: string;
  };
  return (
    <TopBar>
      <Box>
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              newPassword: values.newPassword,
              token: token as string,
            });
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              router.push("/dashboard");
            }
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
                <Typography variant="h4">Change Password</Typography>
                <Form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    name="newPassword"
                    placeholder="New Password"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newPassword}
                    label="new password"
                    variant="outlined"
                    type="password"
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
                      change password
                    </Button>
                  </Box>
                </Form>
              </Container>
            </Box>
          )}
        </Formik>
      </Box>
      <Dialog
        open={!!tokenError}
        onClose={() => router.push("/forgot-password")}
      >
        <DialogTitle>{"Forgot Password"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{tokenError}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => router.push("/forgot-password")}
            color="primary"
          >
            GET A NEW ONE
          </Button>
        </DialogActions>
      </Dialog>
    </TopBar>
  );
};
