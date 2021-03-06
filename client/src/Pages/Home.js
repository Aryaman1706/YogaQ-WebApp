import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import ChatroomList from "../Components/User/ChatroomList";
// import Chatroom from "../Components/User/Chatroom";
import Chatroom from "../Components/Admin/Chatroom";
import Loader from "../Components/Common/Loader";
import ChatroomDrawer from "../Components/User/ChatroomDrawer";
import Landing from "../Components/Landing/Landing";
import ChatroomAppbar from "../Components/User/CharoomAppbar";
import UserAppbar from "../Components/User/UserAppbar";

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

const Home = () => {
  const classes = useStyles();
  const { loading, active_chatroom, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { showDrawer } = useSelector((state) => state.chatroom);

  const [widths, setWidths] = useState({
    chatroomList: 2,
    chatroom: 10,
    drawer: 0,
  });

  useEffect(() => {
    if (showDrawer && active_chatroom) {
      setWidths({
        chatroomList: 2,
        chatroom: 8,
        drawer: 2,
      });
    } else {
      setWidths({
        chatroomList: 2,
        chatroom: 10,
        drawer: 0,
      });
    }
  }, [showDrawer, active_chatroom]);

  const renderClassname = () => {
    if (!active_chatroom || showDrawer) {
      return `${classes.itemB} ${classes.hide}`;
    } else if (active_chatroom) {
      return classes.itemB;
    }
  };

  const chatComponent = () => {
    return (
      <>
        <ChatroomAppbar>
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
              lg={widths.chatroomList}
              className={
                active_chatroom
                  ? `${classes.item} ${classes.hide}`
                  : classes.item
              }
            >
              <ChatroomList />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={widths.chatroom}
              xl={widths.chatroom}
              className={renderClassname()}
            >
              <Chatroom type={"user"} />
            </Grid>
            {active_chatroom ? (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={widths.drawer}
                xl={widths.drawer}
                className={showDrawer ? classes.itemC : classes.hideDrawer}
              >
                <ChatroomDrawer />
              </Grid>
            ) : null}
          </Grid>
        </ChatroomAppbar>
      </>
    );
  };

  const renderMainContent = () => {
    if (isAuthenticated) {
      return chatComponent();
    } else {
      return (
        <UserAppbar>
          <Landing />
        </UserAppbar>
      );
    }
  };

  return <>{loading ? <Loader /> : renderMainContent()}</>;
};

export default Home;
