import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  makeStyles,
  IconButton,
  Menu,
  Typography,
  withStyles,
  Divider,
  Avatar,
} from "@material-ui/core";
import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@material-ui/icons";
import Profile from "../../assets/user.svg";
import { format } from "date-fns";
import { chatroom as chatroomActions } from "../../redux/actions";
import AdminChatroomAppbarExt from "../Admin/ChatroomAppbarExt";
import UserChatroomAppbarExt from "../User/ChatroomAppbarExt";
import DoctorChatroomAppbarExt from "../Doctor/DoctorAppbarExt";
import {
  user as userActions,
  doctor as doctorActions,
  admin as adminActions,
} from "../../redux/actions/index";

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
    cursor: "pointer",
  },
  profile: {
    color: "rgb(92, 132, 251)",
  },
  drawer: {
    color: "rgb(92, 132, 251)",
  },
  menuFlex: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 10px 20px 10px",
    width: "300px",
    justifyContent: "stretch",
    "&:focus": {
      outline: "none",
    },
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  profileFlex: {
    display: "flex",
    flexDirection: "column",
    padding: "0 0 0 1rem",
  },
  profileName: {
    fontWeight: "bolder",
    fontSize: "1.2rem",
  },
  profileJoin: {
    fontWeight: "300",
    fontSize: "0.8rem",
    color: "rgb(104, 118, 141)",
  },
  menuitem: {
    alignSelf: "center",
    fontWeight: "500",
    paddingLeft: "0.5rem",
    fontSize: "1rem",
  },
  profileIcon: {
    height: "2rem",
    width: "auto",
    objectFit: "contain",
  },
  paddingMenuItem: {
    padding: "0.5rem 0 0.5rem 0",
    "&:hover": {
      backgroundColor: "rgb(211,211,211, 0.4)",
      borderRadius: 6,
      cursor: "pointer",
    },
  },
  hide: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  backIcon: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: 10,
  },
  "&:focus": {
    outline: "none",
  },
})((props) => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    {...props}
  />
));

const CharoomAppbar = ({ type, children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  // Common for Admin, User and Doctor
  const globalState = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "user") return state.user;
    else if (type.trim() === "doctor") return state.doctor;
  });

  const { active_chatroom } = globalState;

  const { showDrawer } = useSelector((state) => state.chatroom);
  const history = useHistory();
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

  const renderChatroomAppbarExt = () => {
    if (type.trim() === "admin") {
      return <AdminChatroomAppbarExt classes={classes} />;
    } else if (type.trim() === "user") {
      return (
        <UserChatroomAppbarExt classes={classes} setAnchorEl={setAnchorEl} />
      );
    } else if (type.trim() === "doctor") {
      //
      <DoctorChatroomAppbarExt classes={classes} setAnchorEl={setAnchorEl} />;
    }
  };

  const renderChatroomDetails = () => {
    if (type.trim() === "admin" || type.trim() === "doctor") {
      return (
        <>
          <div style={{ display: "flex", placeItems: "center" }}>
            <Avatar
              alt={active_chatroom.user.id.username}
              src={active_chatroom.user.id.profilePicture}
              style={{ marginRight: "15px" }}
            />
            <Typography variant="h6" style={{ color: "#000000" }}>
              {active_chatroom.user.id.username}
            </Typography>
          </div>
        </>
      );
    } else if (type.trim() === "user") {
      return (
        <>
          <div style={{ display: "flex", placeItems: "center" }}>
            <Avatar
              alt={active_chatroom.partner.id.username}
              src={active_chatroom.partner.id.profilePicture}
              style={{ marginRight: "15px" }}
            />
            <Typography variant="h6" style={{ color: "#000000" }}>
              {active_chatroom.partner.id.username}
            </Typography>
          </div>
        </>
      );
    }
  };

  const clearActive = () => {
    if (type.trim() === "user") {
      dispatch(userActions.clearActiveChatroom());
    } else if (type.trim() === "doctor") {
      dispatch(doctorActions.clearActiveChatroom());
    } else if (type.trim() === "admin") {
      dispatch(adminActions.clearActiveChatroom());
    }
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
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={2}
          xl={2}
          className={active_chatroom && classes.hide}
        >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            className={classes.appbarB}
          >
            <Grid item xs={3} className={classes.title}>
              <Typography
                variant="h5"
                className={classes.logo}
                onClick={() => {
                  if (type.trim() === "admin") {
                    history.push("/admin");
                  } else if (type.trim() === "user") {
                    history.push("/");
                  }
                }}
              >
                YogaQ
              </Typography>
            </Grid>
            {globalState[type.trim()] && (
              <Grid item xs={9} className={classes.btnContainer}>
                <IconButton
                  aria-controls="menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.profile}
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
                <StyledMenu
                  id="menu"
                  keepMounted
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className={classes.menu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <div className={classes.menuFlex}>
                    <div
                      className={classes.flexRow}
                      style={{ paddingBottom: "1rem" }}
                    >
                      <Avatar alt="Profile" src={Profile} />
                      <div className={classes.profileFlex}>
                        <div className={classes.profileName}>
                          {globalState[type.trim()]?.username}
                        </div>
                        <div className={classes.profileJoin}>
                          {globalState[type.trim()].createdAt ? (
                            <>
                              Joined{" "}
                              {format(
                                new Date(globalState[type.trim()].createdAt),
                                "MMM dd, yyyy"
                              )}
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <br />
                    {renderChatroomAppbarExt()}
                  </div>
                </StyledMenu>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={10}
          xl={10}
          className={!active_chatroom && classes.hide}
        >
          <Grid
            container
            justify="center"
            alignItems="flex-start"
            className={classes.appbar}
          >
            <Grid
              item
              xs={1}
              className={classes.backIcon}
              onClick={clearActive}
            >
              <ArrowBackIcon />
            </Grid>
            <Grid item xs={8} sm={10} md={10} lg={11} className={classes.title}>
              {active_chatroom && renderChatroomDetails()}
            </Grid>
            {type.trim() === "user" || type.trim() === "doctor" ? (
              <>
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
              </>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      {children}
    </>
  );
};

export default CharoomAppbar;
