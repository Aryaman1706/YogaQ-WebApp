import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { admin as adminActions } from "../../redux/actions";
import AdminAppbar from "./AdminAppbar";
import ChatroomAppbar from "./ChatroomAppbar";

const Appbar = () => {
  const history = useHistory();
  const { isAuthenticated, admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const load = async () => {
    await dispatch(adminActions.setLoading(true));
    await dispatch(adminActions.loadAdmin());
    dispatch(adminActions.setLoading(false));
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);
  const x = history.location.pathname;
  const render = () => {
    if (/^\/admin$/.test(x)) {
      return <ChatroomAppbar />;
    } else {
      return <AdminAppbar isAuthenticated={isAuthenticated} admin={admin} />;
    }
  };

  return <>{render()}</>;
};

export default Appbar;
