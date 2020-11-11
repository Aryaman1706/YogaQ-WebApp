import React from "react";
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "5px 10px 5px 10px",
    placeItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const EnquiryItem = ({ username, email, id }) => {
  const classes = useStyles();
  const history = useHistory();

  const viewEnquiry = (event) => {
    history.push(`/admin/enquiry/${id}`);
  };

  return (
    <>
      <Grid item>
        <Paper elevation={3} className={classes.paper}>
          <div>
            <Typography variant="h6">{username}</Typography>
            <Typography variant="subtitle2">{email}</Typography>
          </div>
          <div>
            <IconButton onClick={(event) => viewEnquiry(event)}>
              <Visibility color="primary" />
            </IconButton>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default EnquiryItem;
