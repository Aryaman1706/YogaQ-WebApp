import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles({
  list: {
    width: 250,
    padding: "0 0.2rem 0 0",
  },
  fullList: {
    width: "auto",
  },
});

const SideDrawer = ({ sideDrawer, setSideDrawer }) => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    AOS.init();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSideDrawer(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: false,
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List style={{ minHeight: "100vh" }}>
        {["Continue as Therapist"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={(e) => {
              if (text === "Continue as Therapist") {
                // TODO Add therapist login link
                history.push("/");
              }
            }}
            data-aos="fade-up"
          >
            <ListItemIcon>
              {index === 0 && (
                <PeopleAltOutlinedIcon style={{ color: "rgb(92, 132, 251)" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: "#27325a" }} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <SwipeableDrawer
        anchor={"right"}
        open={sideDrawer}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
};

export default SideDrawer;
