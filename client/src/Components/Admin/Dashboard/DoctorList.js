import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Toolbar,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { doctor as doctorActions } from "../../../redux/actions/index";
import DoctorItem from "./DoctorItem";
import AdminLayout from "../../../layout/AdminLayout";
import AdminAppbar from "../../Common/Appbar";

const DoctorList = () => {
  const [pagination, setPagination] = useState({
    loadedPages: 1,
    currentPage: 1,
    startIndex: 0,
    endIndex: 0,
    doctors: [],
    end: false,
  });
  const [compLoading, setCompLoading] = useState(false);
  const {
    loadedPages,
    currentPage,
    startIndex,
    endIndex,
    doctors,
    end,
  } = pagination;
  const doctorState = useSelector((state) => state.doctor);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(doctorActions.clearList());
      dispatch(doctorActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  const load = async () => {
    // await dispatch(doctorActions.setLoading(true));
    console.log("Load function");
    await dispatch(doctorActions.listDoctor(loadedPages));
    setCompLoading(false);
  };
  useEffect(() => {
    setCompLoading(true);
    // load();
    // eslint-disable-next-line
  }, [loadedPages]);

  useEffect(() => {
    console.log("Comp Loading ", compLoading);
    if (compLoading) {
      load();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  useEffect(() => {
    setPagination((prev) => {
      return {
        ...prev,
        startIndex: (prev.loadedPages - 1) * 5,
        endIndex: prev.loadedPages * 5,
        doctors: doctorState.list,
        end: doctorState.end,
      };
    });
  }, [doctorState.end, doctorState.list]);

  const nextHandler = (event) => {
    if (!doctorState.end) {
      if (currentPage === loadedPages) {
        setPagination((prev) => {
          return {
            ...prev,
            loadedPages: prev.loadedPages + 1,
            currentPage: prev.currentPage + 1,
          };
        });
      } else {
        setPagination((prev) => {
          return {
            ...prev,
            currentPage: prev.currentPage + 1,
            startIndex: prev.currentPage * 5,
            endIndex: (prev.currentPage + 1) * 5,
          };
        });
      }
    } else {
      if (currentPage !== loadedPages) {
        setPagination((prev) => {
          return {
            ...prev,
            currentPage: prev.currentPage + 1,
            startIndex: prev.currentPage * 5,
            endIndex: (prev.currentPage + 1) * 5,
          };
        });
      }
    }
  };

  const prevHandler = (event) => {
    if (currentPage > 1) {
      setPagination((prev) => {
        return {
          ...prev,
          currentPage: prev.currentPage - 1,
          startIndex: (prev.currentPage - 2) * 5,
          endIndex: (prev.currentPage - 1) * 5,
        };
      });
    }
  };

  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
          <Typography variant="h2" style={{ padding: "1rem" }}>
            All Doctors
          </Typography>
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item xs={12} lg={12}>
              {compLoading ? null : (
                <>
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="stretch"
                    spacing={2}
                    style={{ padding: "1rem" }}
                  >
                    {doctors.slice(startIndex, endIndex).map((doctor) => {
                      return (
                        <Fragment key={doctor._id}>
                          <DoctorItem
                            username={doctor.username}
                            email={doctor.email}
                            id={doctor._id}
                          />
                        </Fragment>
                      );
                    })}
                  </Grid>
                  <Toolbar></Toolbar>
                  <ButtonGroup variant="contained" color="primary" fullWidth>
                    {currentPage !== 1 ? (
                      <Button
                        startIcon={<ArrowBackIos />}
                        onClick={(event) => prevHandler(event)}
                        style={{
                          backgroundColor: "#0FC1A7",
                          height: "50px",
                          backgroundImage:
                            "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                        }}
                      >
                        Previous
                      </Button>
                    ) : null}
                    {end && currentPage === loadedPages ? null : (
                      <Button
                        endIcon={<ArrowForwardIos />}
                        onClick={(event) => nextHandler(event)}
                        style={{
                          backgroundColor: "#0FC1A7",
                          height: "50px",
                          backgroundImage:
                            "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </ButtonGroup>
                </>
              )}
            </Grid>
          </Grid>
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default DoctorList;
