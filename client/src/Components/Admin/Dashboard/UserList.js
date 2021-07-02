import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { user as userActions } from "../../../redux/actions/index";
import UserItem from "./UserItem";
import AdminAppbar from "../../Common/Appbar";
import AdminLayout from "../../../layout/AdminLayout";
import PaginatedList from "../../Common/PaginatedList";

const UserList = () => {
  const { list, end } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(userActions.clearListUser());
      dispatch(userActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  const loadFunction = async (page) => {
    await dispatch(userActions.listUser(page));
  };

  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
          <Typography variant="h2" style={{ padding: "1rem" }}>
            All Users
          </Typography>
          <PaginatedList
            ListItem={UserItem}
            loadFunction={loadFunction}
            end={end}
            list={list}
          />
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default UserList;
