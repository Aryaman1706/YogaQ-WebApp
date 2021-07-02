import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import EnquiryItem from "./EnquiryItem";
import { useDispatch, useSelector } from "react-redux";
import { enquiry as enquiryActions } from "../../../redux/actions/index";
import AdminLayout from "../../../layout/AdminLayout";
import AdminAppbar from "../../Common/Appbar";
import PaginatedList from "../../Common/PaginatedList";

const EnquiryList = () => {
  const dispatch = useDispatch();
  const { list, end } = useSelector((state) => state.enquiry);

  useEffect(() => {
    return () => {
      dispatch(enquiryActions.clearList());
    };
    // eslint-disable-next-line
  }, []);

  const loadFunction = async (page) => {
    await dispatch(enquiryActions.listEnquiries(page));
  };

  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
          <Typography variant="h2" style={{ padding: "1rem" }}>
            Therapists Applications
          </Typography>
          <PaginatedList
            ListItem={EnquiryItem}
            loadFunction={loadFunction}
            end={end}
            list={list}
          />
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default EnquiryList;
