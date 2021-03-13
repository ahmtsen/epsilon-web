import { Box, Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);
interface TopBarProps {
  children: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            Epsilon Inc.
          </Typography>
          <Box
            display="flex"
            flex={1}
            flexDirection="row"
            justifyContent="flex-end"
          >
            <Link to="/login">
              <Button
                color="secondary"
                variant="outlined"
                style={{ marginLeft: 20 }}
                size="large"
              >
                sign in
              </Button>
            </Link>

            <Link to="/register">
              <Button
                color="secondary"
                variant="outlined"
                style={{ marginLeft: 20 }}
                size="large"
              >
                register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};
