import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ChatroomItem from "./ChatroomItem";

const ChatroomList = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item>
          <Typography variant="h5" align="left">
            My ChatRooms
          </Typography>
        </Grid>
        <ChatroomItem />
      </Grid>
    </>
  );
};

export default ChatroomList;
