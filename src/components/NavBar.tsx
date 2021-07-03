import { Badge, Box, Button, Link } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme,useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, ExitToApp } from "@material-ui/icons";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {isMobile} from 'react-device-detect'
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {
  useGetExceptionsQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { routes } from "../utils/routes";
const drawerWidth = 240;
const useStylesBrowser = makeStyles((theme: Theme) =>
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
const useStylesMobile = makeStyles((theme: Theme) =>
  createStyles({
    root: {
			display: 'flex'
		},
		appBar: {
			transition: theme.transitions.create([ 'margin', 'width' ], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			})
		},
		appBarShift: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
			transition: theme.transitions.create([ 'margin', 'width' ], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		hide: {
			display: 'none'
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0
		},
		drawerPaper: {
			width: drawerWidth
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: 'flex-end'
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			marginLeft: -drawerWidth
		},
		contentShift: {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0
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
  const classesBrowser = useStylesBrowser();
  const classes =useStylesMobile();
  const theme =useTheme();
  const [ open, setOpen ] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
  if(isMobile)
  {
	return <div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Epsilon Inc.
						
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
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
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<Toolbar />
        {children}
			</main>
		</div>
  }
  return (
    <div className={classesBrowser.root}>
      <CssBaseline />
	
      <AppBar position="fixed" className={classesBrowser.appBar}>
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
        className={classesBrowser.drawer}
        variant="permanent"
        classes={{
          paper: classesBrowser.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classesBrowser.drawerContainer}>
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
      <main className={classesBrowser.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};
