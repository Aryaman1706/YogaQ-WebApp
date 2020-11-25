import React, { useEffect } from "react";
import ChatroomAppbar from "./CharoomAppbar";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { user as userAction } from "../../redux/actions";
import UserAppbar from "./UserAppbar";

const Appbar = () => {
  const history = useHistory();
  const { isAuthenticated, user, error, query, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const load = async () => {
    await dispatch(userAction.setLoading(true));
    await dispatch(userAction.loadUser());
    await dispatch(userAction.setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/Incomplete Profile*/i.test(error) && query) {
      history.push(`/signup/?fields=${query}`);
    }
    if (/^User not found*/i.test(error)) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [error, query]);
  const x = history.location.pathname;
  console.log("User app bar", x);
  const render = () => {
    if (loading) return <></>;
    if (/^\/$/i.test(x) && isAuthenticated && user) {
      return <ChatroomAppbar user={user} />;
    } else {
      return <UserAppbar isAuthenticated={isAuthenticated} user={user} />;
    }
  };

  return <>{render()}</>;
};

export default Appbar;
