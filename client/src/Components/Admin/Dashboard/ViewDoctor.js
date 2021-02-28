import React, { useState, useEffect, Fragment } from "react";
import DoctorProfile from "./DoctorProfile";
import DoctorProfileComplete from "./DoctorProfileComplete";
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  Paper,
  Toolbar,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doctor as doctorActions } from "../../../redux/actions/index";
import background from "../../../assets/background.svg";
import AdminAppbar from "../../Common/Appbar";
import AdminLayout from "../../../layout/AdminLayout";
import ListChatroomDoctor from "../../Common/ListChatroomDoctor";
import ListCallsDoctor from "../../Common/ListCallsDoctor";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "flex-end",
  },
  div2: {
    padding: "5px 10px 5px 10px",
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundAttachment: "fixed",
  },
  paper: {
    padding: 50,
    marginTop: "6rem",
    [theme.breakpoints.only("xs")]: {
      padding: 10,
      marginTop: "1rem",
    },
  },
  paperChatroom: {
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

const ViewDoctor = () => {
  const { id } = useParams();
  const history = useHistory();
  const { selectDoctor, error } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const [full, setFull] = useState(false);
  const [compLoading, setCompLoading] = useState(true);

  const start = async () => {
    await dispatch(doctorActions.selectDoctor(id));
    setCompLoading(false);
  };

  useEffect(() => {
    if (!id) {
      history.push("/admin/doctors");
    } else {
      setCompLoading(true);
    }

    return () => {
      dispatch(doctorActions.clearSelected());
      dispatch(doctorActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (compLoading) {
      start();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  useEffect(() => {
    if (/^Doctor not found*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: error,
        showConfirmButton: true,
        timer: 1500,
        willClose: () => {
          dispatch(doctorActions.clearSelected());
          dispatch(doctorActions.clear());
          history.push("/admin/doctors");
        },
      });
    }
    // eslint-disable-next-line
  }, [error]);

  const toggle = (e) => {
    setFull((prev) => {
      return !prev;
    });
  };

  const classes = useStyles();
  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
          {!compLoading && selectDoctor ? (
            <>
              <div className={classes.container}>
                <Grid container item xs={12} sm={12} lg={12} justify="center">
                  <Paper elevation={8} className={classes.paper}>
                    <Typography variant="h2" align="center">
                      Doctor
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="stretch"
                    >
                      <Grid item xs={12} lg={12}>
                        <Grid
                          container
                          direction="column"
                          justify="space-around"
                          alignItems="stretch"
                          spacing={2}
                        >
                          <Grid item>
                            <div className={classes.div}>
                              <Button
                                variant="contained"
                                onClick={(event) => toggle(event)}
                              >
                                {!full ? (
                                  <span>View More</span>
                                ) : (
                                  <span>View Less</span>
                                )}
                              </Button>
                            </div>
                          </Grid>
                          {full ? (
                            <DoctorProfileComplete doctor={selectDoctor} />
                          ) : (
                            <DoctorProfile doctor={selectDoctor} />
                          )}
                        </Grid>
                        <Toolbar></Toolbar>
                        <ListChatroomDoctor doctorId={selectDoctor._id} />
                        <Toolbar></Toolbar>
                        <ListCallsDoctor doctorId={selectDoctor._id} />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </div>
            </>
          ) : null}
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default ViewDoctor;
