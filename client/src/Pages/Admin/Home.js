import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import ChatroomList from "../../Components/Admin/ChatroomList";
import Chatroom from "../../Components/Admin/Chatroom";
import ChatroomAppbar from "../../Components/Admin/ChatroomAppbar";

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
  const { loading, active_chatroom } = useSelector((state) => state.admin);

  const renderClassname = () => {
    if (!active_chatroom) {
      return `${classes.itemB} ${classes.hide}`;
    } else if (active_chatroom) {
      return classes.itemB;
    }
  };

  return (
    <>
      <ChatroomAppbar>
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
                <ChatroomList />
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
                <Chatroom />
              </Grid>
            </Grid>
          </>
        )}
      </ChatroomAppbar>
    </>
  );
};

export default Home;
