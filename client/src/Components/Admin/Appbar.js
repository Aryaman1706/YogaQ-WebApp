import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Link,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { admin as adminActions } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appbar: {
    top: "0",
    position: "sticky",
  },
}));

const Appbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const { isAuthenticated, admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(adminActions.loadAdmin());
    return () => {
      //
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Link
            underline="none"
            color="inherit"
            className={classes.title}
            onClick={(event) => {
              history.push("/");
            }}
          >
            <Typography variant="h6">Admin Panel</Typography>
          </Link>
          {isAuthenticated && admin ? (
            <>
              <IconButton
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu"
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link
                    underline="none"
                    color="inherit"
                    onClick={(event) => {
                      history.push("/admin/profile");
                    }}
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    underline="none"
                    color="inherit"
                    onClick={(event) => {
                      history.push("/");
                    }}
                  >
                    LogOut
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={(event) => {
                history.push("/");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </>
  );
};

export default Appbar;
