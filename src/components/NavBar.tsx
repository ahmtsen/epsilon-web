import { Badge, Box, Button, Link } from "@material-ui/core";
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
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  useGetExceptionsQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { routes } from "../utils/routes";
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
    paper: {
      border: "1px solid",
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    typography: {
      padding: theme.spacing(2),
    },
  })
);
interface NavBarProps {
  children?: React.ReactNode;
}

export const NavBar: React.FC<NavBarProps> = ({ children }) => {
  const [, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery();
  const [{ data: exceptions }] = useGetExceptionsQuery();
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
            <Button
              color="secondary"
              variant="outlined"
              style={{ marginLeft: 20 }}
              size="large"
              startIcon={<AccountCircle />}
            >
              {data?.me?.username}
            </Button>
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
                  {route.name === "Notifications" ? (
                    <ListItem button>
                      <ListItemIcon>
                        <Badge
                          color="error"
                          badgeContent={
                            exceptions?.getExceptions.filter(
                              (x) => !x.readStatus
                            ).length
                          }
                        >
                          {route.icon}
                        </Badge>
                      </ListItemIcon>

                      <ListItemText primary={route.name} />
                    </ListItem>
                  ) : (
                    <ListItem button>
                      <ListItemIcon>{route.icon}</ListItemIcon>
                      <ListItemText primary={route.name} />
                    </ListItem>
                  )}
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
