import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doctor as doctorActions } from "../../redux/actions";

const Appbar = () => {
  const dispatch = useDispatch();
  const load = async () => {
    await dispatch(doctorActions.setLoading(true));
    await dispatch(doctorActions.loadDoctor());
    await dispatch(doctorActions.setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  return <></>;
};

export default Appbar;
