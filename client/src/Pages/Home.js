import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Hidden } from "@material-ui/core";
import { useSelector } from "react-redux";
import ChatroomList from "../Components/User/ChatroomList";
import Chatroom from "../Components/User/Chatroom";
import Loader from "../Components/Loader";
import ChatroomDrawer from "../Components/User/ChatroomDrawer";

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
}));

const Home = () => {
  const classes = useStyles();
  const { loading, active_chatroom } = useSelector((state) => state.user);
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
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            className={classes.container}
          >
            <Grid item xs={widths.chatroomList} className={classes.item}>
              <ChatroomList />
            </Grid>
            <Grid item xs={widths.chatroom} className={classes.itemB}>
              <Chatroom />
            </Grid>
            {active_chatroom ? (
              <Hidden xsUp={!showDrawer}>
                <Grid item xs={widths.drawer} className={classes.itemC}>
                  <ChatroomDrawer />
                </Grid>
              </Hidden>
            ) : null}
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
