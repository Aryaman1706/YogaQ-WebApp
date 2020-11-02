import React, { useState } from "react";
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
  const login = true; //! Change Later

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" underline="none" color="inherit">
              Admin Panel
            </Link>
          </Typography>
          {login ? (
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
                  <Link href="/" underline="none" color="inherit">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/" underline="none" color="inherit">
                    LogOut
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </>
  );
};

export default Appbar;
