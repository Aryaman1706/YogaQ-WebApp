import { makeStyles } from "@material-ui/core";
import React from "react";
import SideNav from "./SideNav";

const useStyles = makeStyles((theme) => ({
  sideNav: {
    height: "calc(100% - 70px)",
    position: "fixed",
    width: "300px",
    top: 70,
    left: 0,
    backgroundColor: "#FFF",
    overflowY: "auto",
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
const AdminLayout = ({ children }) => {
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

export default AdminLayout;
