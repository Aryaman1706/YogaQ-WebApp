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
import axios from "../../../utils/axios";

const EnquiryList = () => {
  const [pagination, setPagination] = useState({
    loadedPages: 1,
    currentPage: 1,
    startIndex: 0,
    endIndex: 0,
    enquiries: [],
    end: false,
  });
  const {
    loadedPages,
    currentPage,
    startIndex,
    endIndex,
    enquiries,
    end,
  } = pagination;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/doctor/enquiry/list/?page=${loadedPages}`).then((res) => {
      setPagination((prev) => {
        return {
          ...prev,
          startIndex: (prev.loadedPages - 1) * 5,
          endIndex: prev.loadedPages * 5,
          enquiries: [...prev.enquiries, ...res.data.body.enquiries],
          end: res.data.body.end,
        };
      });
      setLoading(false);
    });
  }, [loadedPages]);

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
      <Typography variant="h2" align="center">
        All Enquiries
      </Typography>
      <Toolbar></Toolbar>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={2} lg={4}></Grid>
        <Grid item xs={8} lg={4}>
          {loading ? null : (
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
              <Toolbar></Toolbar>
              <ButtonGroup variant="contained" color="primary" fullWidth>
                {currentPage !== 1 ? (
                  <Button
                    startIcon={<ArrowBackIos />}
                    onClick={(event) => prevHandler(event)}
                  >
                    Previous
                  </Button>
                ) : null}
                {end && currentPage === loadedPages ? null : (
                  <Button
                    endIcon={<ArrowForwardIos />}
                    onClick={(event) => nextHandler(event)}
                  >
                    Next
                  </Button>
                )}
              </ButtonGroup>
            </>
          )}
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default EnquiryList;
