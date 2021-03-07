import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { doctor as doctorActions } from "../../../redux/actions/index";
import DoctorItem from "./DoctorItem";
import AdminLayout from "../../../layout/AdminLayout";
import AdminAppbar from "../../Common/Appbar";
import PaginatedList from "../../Common/PaginatedList";

const DoctorList = () => {
  const { end, list } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(doctorActions.clearList());
      dispatch(doctorActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  const loadFunction = async (page) => {
    await dispatch(doctorActions.listDoctor(page));
  };

  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
          <Typography variant="h2" style={{ padding: "1rem" }}>
            All Therapists
          </Typography>
          <PaginatedList
            ListItem={DoctorItem}
            loadFunction={loadFunction}
            end={end}
            list={list}
          />
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default DoctorList;
