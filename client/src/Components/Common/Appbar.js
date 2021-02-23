import React from "react";
import {
  Typography,
  makeStyles,
  Menu,
  Grid,
  withStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminAppbarExt from "../Admin/AdminAppbarExt";
import UserAppbarExt from "../User/UserAppbarExt";

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
      cursor: "pointer",
    },
  },
}));

const Appbar = ({ type, children }) => {
  const classes = useStyles();
  const history = useHistory();

  const { loading } = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "user") return state.user;
    else if (type.trim() === "doctor") return state.doctor;
  });

  const logoClickHandler = () => {
    if (type.trim() === "admin") history.push("/admin");
    else if (type.trim() === "user") history.push("/");
    else if (type.trim() === "doctor") history.push("/doctor");
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

  const renderAppbarExtension = () => {
    if (type.trim() === "admin")
      return <AdminAppbarExt classes={classes} StyledMenu={StyledMenu} />;
    if (type.trim() === "user")
      return <UserAppbarExt classes={classes} StyledMenu={StyledMenu} />;
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
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
                  onClick={() => logoClickHandler()}
                >
                  YogaQ
                </Typography>
              </Grid>
              <Grid item xs={9} className={classes.btnContainer}>
                {renderAppbarExtension()}
              </Grid>
            </Grid>
          </Grid>
          {children}
        </>
      )}
    </>
  );
};

export default Appbar;
