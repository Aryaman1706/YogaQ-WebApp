import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { chatroom as chatroomActions } from "../../redux/actions/index";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  parent: {
    top: "0",
    backgroundColor: "#FFFFFF",
    position: "sticky",
    width: "100%",
  },
  appbar: {
    height: "70px",
    placeItems: "center",
    width: "100%",
    border: "1px solid rgb(216, 216, 224)",
    borderTop: "0px",
    borderLeft: "0px",
  },
  appbarB: {
    height: "70px",
    placeItems: "center",
    width: "100%",
    border: "1px solid rgb(216, 216, 224)",
    borderTop: "0px",
    borderLeft: "0px",
  },
  title: {
    paddingLeft: "15px",
  },
  btnContainer: {
    textAlign: "right",
    "&>button": {
      paddingRight: "15px",
    },
  },
  logo: {
    color: "#0FC1A7",
    fontWeight: "bolder",
    letterSpacing: "1px",
  },
  profile: {
    color: "rgb(92, 132, 251)",
  },
  drawer: {
    color: "rgb(92, 132, 251)",
  },
}));

const CharoomAppbar = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { active_chatroom } = useSelector((state) => state.user);
  const { showDrawer } = useSelector((state) => state.chatroom);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawerHandler = () => {
    dispatch(chatroomActions.setDrawer(!showDrawer));
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        className={classes.parent}
      >
        <Grid item xs={2}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            className={classes.appbarB}
          >
            <Grid item xs={3} className={classes.title}>
              <Typography variant="h5" className={classes.logo}>
                YogaQ
              </Typography>
            </Grid>
            <Grid item xs={9} className={classes.btnContainer}>
              <IconButton
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.profile}
              >
                <AccountCircleOutlinedIcon />
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            justify="center"
            alignItems="flex-start"
            className={classes.appbar}
          >
            <Grid item xs={11} className={classes.title}>
              {active_chatroom ? (
                <div style={{ display: "flex", placeItems: "center" }}>
                  <Avatar
                    alt={active_chatroom.partner.id.username}
                    src={active_chatroom.partner.id.profilePicture}
                    style={{ marginRight: "15px" }}
                  />
                  <Typography variant="h6" style={{ color: "#000000" }}>
                    {active_chatroom ? active_chatroom.partner.id.username : ""}
                  </Typography>
                </div>
              ) : null}
            </Grid>
            {active_chatroom && (
              <Grid item xs={1} className={classes.btnContainer}>
                <IconButton
                  className={classes.drawer}
                  onClick={() => drawerHandler()}
                >
                  {showDrawer ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CharoomAppbar;
