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
import { user as userAction } from "../../redux/actions";

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
  const { isAuthenticated, user, error, query } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(userAction.loadUser());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error && query) {
      history.push(`/signup/?fields=${query}`);
    }
    if (/User not found./i.test(error)) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [error, query]);

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
            <Typography variant="h6">YogaQ</Typography>
          </Link>
          {isAuthenticated && user ? (
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
                  <Link underline="none" color="inherit">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link underline="none" color="inherit">
                    LogOut
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              href={`${process.env.REACT_APP_SERVER_URL}/api/user/auth`}
            >
              Login with Google
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </>
  );
};

export default Appbar;
