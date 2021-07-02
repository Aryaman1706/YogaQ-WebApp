import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { admin as adminActions } from "../../redux/actions";

const Appbar = () => {
  const dispatch = useDispatch();
  const load = async () => {
    await dispatch(adminActions.setLoading(true));
    await dispatch(adminActions.loadAdmin());
    await dispatch(adminActions.setLoading(false));
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  return <></>;
};

export default Appbar;
