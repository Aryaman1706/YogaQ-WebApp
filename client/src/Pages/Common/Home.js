import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import Loader from "../../Components/Common/Loader";
import ChatroomList from "../../Components/Common/ChatroomList";
import Chatroom from "../../Components/Common/Chatroom";
import ChatroomAppbar from "../../Components/Common/ChatroomAppbar";
import UserAppbar from "../../Components/User/UserAppbar";
import Landing from "../../Components/Landing/Landing";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  item: {
    border: "1px solid rgb(216, 216, 224)",
    borderTop: "0px",
    borderLeft: "0px",
    padding: "0px 10px 0px 10px",
    height: "calc(100vh - 70px)",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
  itemB: {
    padding: "0px 10px 0px 10px",
    height: "calc(100vh - 70px)",
  },
  itemC: {
    border: "1px solid rgb(216, 216, 224)",
    borderTop: "0px",
    padding: "15px 10px 15px 10px",
    height: "calc(100vh - 70px)",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
  hide: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  hideDrawer: {
    display: "none",
  },
}));

const Home = ({ type }) => {
  const classes = useStyles();
  const globalState = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "user") return state.user;
    else if (type.trim() === "doctor") return state.doctor;
  });

  const { loading, active_chatroom } = globalState;

  const renderClassname = () => {
    if (!active_chatroom) {
      return `${classes.itemB} ${classes.hide}`;
    } else if (active_chatroom) {
      return classes.itemB;
    }
  };

  const chatComponent = () => {
    return (
      <>
        <ChatroomAppbar type={type.trim()}>
          <>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="stretch"
              className={classes.container}
            >
              <Grid
                item
                xs={12}
                lg={2}
                className={
                  active_chatroom
                    ? `${classes.item} ${classes.hide}`
                    : classes.item
                }
              >
                <ChatroomList type={type.trim()} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={10}
                xl={10}
                className={renderClassname()}
              >
                <Chatroom type={type.trim()} />
              </Grid>
            </Grid>
          </>
        </ChatroomAppbar>
      </>
    );
  };

  const renderMainContent = () => {
    if (type.trim() === "user" && !globalState.isAuthenticated) {
      return (
        <UserAppbar>
          <Landing />
        </UserAppbar>
      );
    } else {
      return chatComponent();
    }
  };

  return <>{loading ? <Loader /> : renderMainContent()}</>;
};

export default Home;
