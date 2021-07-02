import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { user as userAction } from "../../redux/actions";

const Appbar = () => {
  const history = useHistory();
  const { error, query } = useSelector((state) => state.user);
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
    if (/^Incomplete Profile*/i.test(error) && query) {
      history.push(`/signup/?fields=${query}`);
    }
    if (/^User not found*/i.test(error)) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [error, query]);

  return <></>;
};

export default Appbar;
