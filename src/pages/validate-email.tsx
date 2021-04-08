import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Theme,
  Typography,
  createStyles,
} from "@material-ui/core";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { TopBar } from "../components/TopBar";
import { FieldError, useValidateEmailMutation } from "../generated/graphql";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
export const ValidateEmail: React.FC = () => {
  const [, validateEmail] = useValidateEmailMutation();
  const [error, setError] = useState<FieldError | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useHistory();
  const classes = useStyles();
  const { token } = useParams() as {
    token: string;
  };
  const validation = useRef(async () => {
    const response = await validateEmail({
      token: token,
    });
    if (response.data?.validateEmail.errors) {
      // error
      setError(response.data.validateEmail.errors[0]);
    } else if (response.data?.validateEmail.user) {
      // validation successful
      setSuccess(true);
    }
  });

  useEffect(() => {
    validation.current();
  }, []);

  let body: ReactElement;

  if (error !== null) {
    body = (
      <Box>
        <Typography variant="h4">
          {error.field[0].toUpperCase() + error.field.slice(1) + " Error"}
        </Typography>
        <Typography>{error.message}</Typography>
      </Box>
    );
  } else if (error === null && success) {
    body = (
      <Box>
        <Typography variant="h4">Success</Typography>
        <Typography>Successfuly valited e-mail. Now you can login!</Typography>
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Button
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => router.push("/login")}
          >
            sign in
          </Button>
        </Box>
      </Box>
    );
  } else {
    body = (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress size={150} color="inherit" />
      </Backdrop>
    );
  }

  return (
    <TopBar>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm" style={{ marginTop: 30 }}>
          {body}
        </Container>
      </Box>
    </TopBar>
  );
};
