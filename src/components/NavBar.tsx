import {
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Paper,
  Popper,
  PopperPlacementType,
} from "@material-ui/core";
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
import {
  AccountCircle,
  Clear,
  ExitToApp,
  Notifications,
} from "@material-ui/icons";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  Exception,
  useGetExceptionsQuery,
  useLogoutMutation,
  useMeQuery,
  useReadExceptionMutation,
} from "../generated/graphql";
import { createExceptionNotification } from "../utils/createExceptionNotification";
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
  const [, read] = useReadExceptionMutation();
  const router = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [except, setExcept] = React.useState<Exception[]>([]);
  const classes = useStyles();

  React.useEffect(() => {
    if (exceptions?.getExceptions) {
      setExcept(exceptions.getExceptions);
    }
  }, [exceptions]);

  const handleClick = (newPlacement: PopperPlacementType) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
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
            <IconButton color="secondary" onClick={handleClick("bottom-end")}>
              <Badge badgeContent={except.length} color="error">
                <Notifications fontSize="default" />
              </Badge>
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorEl}
              placement={placement}
              transition
            >
              {except.map((exception) => {
                return (
                  <Paper key={exception.id}>
                    <Box
                      flex={1}
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                    >
                      <Typography className={classes.typography}>
                        {createExceptionNotification(exception)}
                      </Typography>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setExcept(
                            except.filter((x) => x.id !== exception.id)
                          );
                          read({ id: exception.id });
                        }}
                      >
                        <Clear fontSize="default" />
                      </IconButton>
                    </Box>
                  </Paper>
                );
              })}
            </Popper>
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
