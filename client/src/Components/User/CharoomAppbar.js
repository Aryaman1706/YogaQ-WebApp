import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  withStyles,
  IconButton,
  Menu,
  Typography,
  Avatar,
  Divider,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { chatroom as chatroomActions } from "../../redux/actions/index";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Profile from "../../assets/user.svg";
import { format } from "date-fns";
import ProfileIcon from "../../assets/profile.svg";
import LogoutIcon from "../../assets/log-out.svg";
import StarIcon from "../../assets/star.svg";
import FileIcon from "../../assets/file-sharing.svg";
import PrivacyIcon from "../../assets/privacy-policy.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  clearActiveChatroom,
  logoutUser,
} from "../../redux/actions/userActions";

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

const CharoomAppbar = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { active_chatroom } = useSelector((state) => state.user);
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

  const userLogOut = async () => {
    await dispatch(logoutUser());
    history.push("/");
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
                      <div className={classes.profileName}>{user.username}</div>
                      <div className={classes.profileJoin}>
                        Joined{" "}
                        {format(new Date(user.createdAt), "MMM dd, yyyy")}
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <br />
                  <div
                    className={`${classes.flexRow} ${classes.paddingMenuItem}`}
                    onClick={() => {
                      history.push("/edit");
                      setAnchorEl(null);
                    }}
                  >
                    <div>
                      <img
                        src={ProfileIcon}
                        alt="profile-icon"
                        className={classes.profileIcon}
                      />
                    </div>
                    <div className={classes.menuitem}>Profile</div>
                  </div>
                  <div
                    className={`${classes.flexRow} ${classes.paddingMenuItem}`}
                    onClick={() => {
                      history.push("/edit");
                      setAnchorEl(null);
                    }}
                  >
                    <div>
                      <img
                        src={StarIcon}
                        alt="star-icon"
                        className={classes.profileIcon}
                      />
                    </div>
                    <div className={classes.menuitem}>Starred Messages</div>
                  </div>
                  <div
                    className={`${classes.flexRow} ${classes.paddingMenuItem}`}
                    onClick={() => {
                      history.push("/edit");
                      setAnchorEl(null);
                    }}
                  >
                    <div>
                      <img
                        src={FileIcon}
                        alt="file-icon"
                        className={classes.profileIcon}
                      />
                    </div>
                    <div className={classes.menuitem}>Shared Files</div>
                  </div>
                  <div
                    className={`${classes.flexRow} ${classes.paddingMenuItem}`}
                    onClick={() => {
                      window.open("https://www.yogaqtherapy.com/privacy");
                      setAnchorEl(null);
                    }}
                  >
                    <div>
                      <img
                        src={PrivacyIcon}
                        alt="policy-icon"
                        className={classes.profileIcon}
                      />
                    </div>
                    <div className={classes.menuitem}>Privacy Policy</div>
                  </div>
                  <div
                    className={`${classes.flexRow} ${classes.paddingMenuItem}`}
                    onClick={() => {
                      userLogOut();
                      setAnchorEl(null);
                    }}
                  >
                    <div>
                      <img
                        src={LogoutIcon}
                        alt="profile-icon"
                        className={classes.profileIcon}
                      />
                    </div>
                    <div className={classes.menuitem}>Log out</div>
                  </div>
                </div>
              </StyledMenu>
            </Grid>
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
              onClick={() => {
                dispatch(clearActiveChatroom());
              }}
            >
              <ArrowBackIcon />
            </Grid>
            <Grid item xs={8} sm={10} md={10} lg={11} className={classes.title}>
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
