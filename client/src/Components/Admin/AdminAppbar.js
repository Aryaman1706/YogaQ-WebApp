import React, { useState } from "react";
import {
  Typography,
  Button,
  IconButton,
  makeStyles,
  Menu,
  Grid,
  Divider,
  Avatar,
  withStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { format } from "date-fns";
import ProfileIcon from "../../assets/profile.svg";
import Profile from "../../assets/user.svg";
import LogoutIcon from "../../assets/log-out.svg";

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: "70px",
    placeItems: "center",
    width: "100%",
    border: "1px solid rgb(216, 216, 224)",
    borderTop: "0px",
    borderLeft: "0px",
  },
  parent: {
    top: "0",
    backgroundColor: "#FFFFFF",
    position: "sticky",
    width: "100%",
    zIndex: 100,
  },
  title: {
    paddingLeft: "15px",
  },

  btnContainer: {
    textAlign: "right",
    paddingRight: "10px",
    // "&>button": {
    //   paddingRight: "15px",
    // },
  },
  logo: {
    color: "#0FC1A7",
    fontWeight: "bolder",
    letterSpacing: "1px",
    cursor: "pointer",
  },
  profileIcon: {
    height: "2rem",
    width: "auto",
    objectFit: "contain",
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
  btn: {
    border: "1px solid #0FC1A7",
    padding: "0.5rem",
    color: "#0FC1A7",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    fontSize: "0.9rem",
    fontFamily: "sans-serif",
    transition: "ease-out 0.5s",
    "&:before": {
      width: "0%",
      height: "100%",
      top: "0",
      left: "0",
    },
    "&:hover": {
      boxShadow: "inset 400px 0 0 0 #0FC1A7",
      color: "#fff",
    },
  },
  paddingMenuItem: {
    padding: "0.5rem 0 0.5rem 0",
    "&:hover": {
      backgroundColor: "rgb(211,211,211, 0.4)",
      borderRadius: 6,
    },
  },
}));

const AdminAppbar = ({ isAuthenticated, admin }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={classes.appbar}
        >
          <Grid item xs={3} className={classes.title}>
            <Typography
              variant="h5"
              className={classes.logo}
              onClick={() => {
                history.push("/admin");
              }}
            >
              YogaQ
            </Typography>
          </Grid>
          <Grid item xs={9} className={classes.btnContainer}>
            {isAuthenticated && admin ? (
              <>
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
                          {admin.username}
                        </div>
                        <div className={classes.profileJoin}>
                          Joined{" "}
                          {format(new Date(admin.createdAt), "MMM dd, yyyy")}
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <br />
                    <div
                      className={`${classes.flexRow} ${classes.paddingMenuItem}`}
                      onClick={() => {
                        history.push("/edit");
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
              </>
            ) : (
              <Button
                className={classes.btn}
                onClick={() => {
                  history.push("/admin/login");
                }}
              >
                Login as Admin
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminAppbar;
