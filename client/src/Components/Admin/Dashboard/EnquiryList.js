import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Toolbar,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import EnquiryItem from "./EnquiryItem";
import { useDispatch, useSelector } from "react-redux";
import { enquiry as enquiryActions } from "../../../redux/actions/index";
import AdminLayout from "../../../layout/AdminLayout";

const EnquiryList = () => {
  const [pagination, setPagination] = useState({
    loadedPages: 1,
    currentPage: 1,
    startIndex: 0,
    endIndex: 0,
    enquiries: [],
    end: false,
  });
  const [compLoading, setCompLoading] = useState(true);
  const {
    loadedPages,
    currentPage,
    startIndex,
    endIndex,
    enquiries,
    end,
  } = pagination;
  const dispatch = useDispatch();
  const enquiryState = useSelector((state) => state.enquiry);

  useEffect(() => {
    return () => {
      dispatch(enquiryActions.clearList());
    };
    // eslint-disable-next-line
  }, []);

  const load = async () => {
    // setCompLoading(true);
    await dispatch(enquiryActions.listEnquiries(loadedPages));
    setCompLoading(false);
  };
  useEffect(() => {
    setCompLoading(true);
    // load();
    // eslint-disable-next-line
  }, [loadedPages]);

  useEffect(() => {
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
        enquiries: enquiryState.list,
        end: enquiryState.end,
      };
    });
  }, [enquiryState.end, enquiryState.list]);

  const nextHandler = (event) => {
    if (!end) {
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
      <AdminLayout>
        <Typography variant="h2" style={{ padding: "1rem" }}>
          All Enquiries
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          style={{ padding: "1rem" }}
        >
          <Grid item xs={12} lg={12}>
            {compLoading ? null : (
              <>
                <Grid
                  container
                  direction="column"
                  justify="space-around"
                  alignItems="stretch"
                  spacing={2}
                >
                  {enquiries.slice(startIndex, endIndex).map((enquiry) => {
                    return (
                      <>
                        <EnquiryItem
                          key={enquiry._id}
                          username={enquiry.username}
                          email={enquiry.email}
                          id={enquiry._id}
                        />
                      </>
                    );
                  })}
                </Grid>
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
    </>
  );
};

export default EnquiryList;
