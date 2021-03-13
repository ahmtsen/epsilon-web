import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, ExitToApp } from "@material-ui/icons";
import { routes } from "../utils/routes";
import React from "react";
import { Box, Button, Link } from "@material-ui/core";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { NavLink, useHistory } from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
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
interface NavBarProps {
  children: React.ReactNode;
}

export const NavBar: React.FC<NavBarProps> = ({ children }) => {
  const [, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery();
  const router = useHistory();
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
            <NavLink to="/profile">
              <Button
                color="secondary"
                variant="outlined"
                style={{ marginLeft: 20 }}
                size="large"
                startIcon={<AccountCircle />}
              >
                {data?.me?.username}
              </Button>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {routes.map((route) => (
              <NavLink to={route.href} key={route.name}>
                <Link>
                  <ListItem button>
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.name} />
                  </ListItem>
                </Link>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              button
              onClick={async () => {
                await logout();
                router.replace("/login");
              }}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};
