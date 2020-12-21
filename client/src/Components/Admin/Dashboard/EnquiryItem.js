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
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 16px 0px",
    borderRadius: "3px",
    "&:hover": {
      transform: "scale(1.02)",
      transition: "all 0.16s ease-in 0s",
      cursor: "pointer",
    },
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
        <Paper
          elevation={0}
          className={classes.paper}
          onClick={(event) => viewEnquiry(event)}
        >
          <div>
            <Typography variant="h6">{username}</Typography>
            <Typography variant="subtitle2">{email}</Typography>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default EnquiryItem;
