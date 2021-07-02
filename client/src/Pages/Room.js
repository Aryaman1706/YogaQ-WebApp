import React from "react";
import { Grid } from "@material-ui/core";
import SideBar from "../Components/SideBar";
import ChatArea from "../Components/ChatArea";

const Room = () => {
  return (
    <>
      <Grid container direction="row" justify="flex-start" alignItems="stretch">
        <SideBar />
        <ChatArea />
      </Grid>
    </>
  );
};

export default Room;
