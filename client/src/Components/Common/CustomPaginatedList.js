import React, { Fragment, useEffect, useState } from "react";
import { Grid, Button, ButtonGroup, Toolbar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const PaginatedList = ({
  ListItem,
  loadFunction,
  end: globalStateEnd,
  list: globalStateList,
  ...rest
}) => {
  const [pagination, setPagination] = useState({
    loadedPages: 1,
    currentPage: 1,
    startIndex: 0,
    endIndex: 0,
    list: [],
    end: false,
  });
  const [compLoading, setCompLoading] = useState(false);
  const {
    loadedPages,
    currentPage,
    startIndex,
    endIndex,
    list,
    end,
  } = pagination;

  const load = async () => {
    loadFunction(loadedPages, ...rest);
    setCompLoading(false);
  };
  useEffect(() => {
    setCompLoading(true);
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
        list: globalStateList,
        end: globalStateEnd,
      };
    });
  }, [globalStateEnd, globalStateList]);

  const nextHandler = (event) => {
    if (!globalStateEnd) {
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
                {list.slice(startIndex, endIndex).map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <ListItem value={item} {...rest} />
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
    </>
  );
};

export default PaginatedList;
