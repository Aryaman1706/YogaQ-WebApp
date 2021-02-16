import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doctor as doctorActions } from "../../redux/actions";

const Appbar = () => {
  const history = useHistory();
  const { error } = useSelector((state) => state.doctor);
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

  // useEffect(() => {
  //   if (/^Invalid account*/i.test(error) || ) {
  //     history.push("/");
  //   }
  //   // eslint-disable-next-line
  // }, [error]);

  return <></>;
};

export default Appbar;
