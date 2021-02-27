import { makeStyles } from "@material-ui/core";
import React from "react";
import SideNav from "./DoctorSideNav";

const useStyles = makeStyles((theme) => ({
  sideNav: {
    // borderRight: "1px solid grey",
    height: "calc(100% - 70px)",
    position: "fixed",
    width: "300px",
    top: 70,
    left: 0,
    backgroundColor: "#F2F0ED",
    overflowY: 'auto'
  },
  borderClass: {
    border: "1px solid grey",
  },
  heightClass: {
    height: "50vh",
  },
  main: {
    marginLeft: "300px",
    padding: "0px 10px",
  },
}));
const DoctorLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.sideNav}>
        <SideNav />
      </div>
      <div className={classes.main}>{children}</div>
    </>
  );
};

export default DoctorLayout;
