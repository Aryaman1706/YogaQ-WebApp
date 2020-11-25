import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import ChatroomList from "../../Components/Admin/ChatroomList";
import Chatroom from "../../Components/Admin/Chatroom";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  item: {
    border: "2px solid rgb(104, 118, 141)",
    borderTop: "0px",
    borderLeft: "0px",
    padding: "15px 10px 15px 10px",
    height: "calc(100vh - 50px)",
    overflowY: "auto",
  },
  itemB: {
    padding: "15px 10px 15px 10px",
    height: "calc(100vh - 50px)",
  },
}));

const Home = () => {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.admin);
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
            <Grid item xs={2} className={classes.item}>
              <ChatroomList />
            </Grid>
            <Grid item xs={10} className={classes.itemB}>
              <Chatroom />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
