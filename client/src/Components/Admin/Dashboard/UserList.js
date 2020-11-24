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
import { user as userActions } from "../../../redux/actions/index";
import UserItem from "./UserItem";

const UserList = () => {
  const [pagination, setPagination] = useState({
    loadedPages: 1,
    currentPage: 1,
    startIndex: 0,
    endIndex: 0,
    users: [],
    end: false,
  });
  const [compLoading, setCompLoading] = useState(true);
  const {
    loadedPages,
    currentPage,
    startIndex,
    endIndex,
    users,
    end,
  } = pagination;
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(userActions.clearListUser());
      dispatch(userActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  const load = async () => {
    // await dispatch(userActions.setLoading(true));
    await dispatch(userActions.listUser(loadedPages));
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
        users: userState.list,
        end: userState.end,
      };
    });
  }, [userState.end, userState.list]);

  const nextHandler = (event) => {
    if (!userState.end) {
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
        All Users
      </Typography>
      <Toolbar></Toolbar>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={2} lg={4}></Grid>
        <Grid item xs={8} lg={4}>
          {compLoading ? null : (
            <>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="stretch"
                spacing={2}
              >
                {users.slice(startIndex, endIndex).map((user) => {
                  return (
                    <Fragment key={user._id}>
                      <UserItem
                        username={user.username}
                        email={user.email}
                        id={user._id}
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

export default UserList;
