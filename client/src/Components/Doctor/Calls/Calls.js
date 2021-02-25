import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { doctor as doctorActions } from "../../../redux/actions/index";
import CallHistoryItem from "../../User/CallHistoryItem";
import { useHistory, useParams } from "react-router-dom";
import homeIcon from "../../../assets/home.svg";
import PaginatedList from "../../Common/PaginatedList";

const useStyles = makeStyles((theme) => ({
  homeIcon: {
    height: "1.5rem",
    width: "auto",
    objectFit: "contain",
    margin: "auto 0 auto 0",
    paddingRight: "0.5rem",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    width: "fit-content",
    padding: "0.5rem",
    "&:hover": {
      backgroundColor: "rgb(211,211,211, 0.4)",
      cursor: "pointer",
      borderRadius: "10px",
      transition: "all 0.2s ease-in-out",
    },
  },
  homeText: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    margin: "auto 0 auto 0",
  },
}));

const Calls = () => {
  const classes = useStyles();
  const history = useHistory();
  const { calls, end } = useSelector((state) => state.doctor);

  const dispatch = useDispatch();
  const { chatroomId } = useParams();

  const loadFunction = async (page) => {
    if (chatroomId) {
      await dispatch(doctorActions.listCallsByChatroom(chatroomId, page));
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ padding: "1rem" }}>
          <div
            className={classes.flexRow}
            onClick={() => {
              history.push("/");
            }}
          >
            <img src={homeIcon} alt="home" className={classes.homeIcon} />
            <span className={classes.homeText}>Back to home</span>
          </div>
        </Grid>
      </Grid>
      <Typography variant="h2" style={{ padding: "1rem" }}>
        Calls
      </Typography>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        style={{ padding: "1rem" }}
      >
        {chatroomId ? (
          <PaginatedList
            ListItem={CallHistoryItem}
            loadFunction={loadFunction}
            end={end}
            list={calls}
            chatroomId={chatroomId}
            type={"doctor"}
          />
        ) : (
          <h1>List all calls here with filters and all</h1>
        )}
      </Grid>
    </>
  );
};

export default Calls;
