import Swal from "sweetalert2";
import axios from "../utils/axios";

const useCallPagination = (
  doctorId,
  pagination,
  setPagination,
  callFilter,
  setCallFilter,
  setCompLoading
) => {
  const loadFunction = async () => {
    console.log("load called");

    try {
      const res = await axios.get(
        `/call/doctor/list/${doctorId}/?page=${
          pagination.loadedPages + 1
        }&startDate=${callFilter.startDate}&endDate=${callFilter.endDate}`
      );
      console.log(res, "response");

      setPagination((prev) => {
        if (prev.list?.length > 0) {
          return {
            loadedPages: 1,
            currentPage: 1,
            startIndex: 0,
            endIndex: 5,
            list: [...prev.list, ...res.data.body.calls],
            end: res.data.body.end,
          };
        } else {
          return {
            loadedPages: 1,
            currentPage: 1,
            startIndex: 0,
            endIndex: 5,
            list: res.data.body.calls,
            end: res.data.body.end,
          };
        }
      });
    } catch (error) {
      console.log(error);
      setCallFilter({ startDate: null, endDate: null });
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: `${error.response.data.error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  const fetchMore = async () => {
    console.log("fetch more called");
    try {
      const res = await axios.get(
        `/call/doctor/list/${doctorId}/?page=${
          pagination.loadedPages + 1
        }&startDate=${callFilter.startDate}&endDate=${callFilter.endDate}`
      );
      console.log(res, "response");

      setPagination((prev) => {
        return {
          loadedPages: prev.loadedPages + 1,
          currentPage: prev.currentPage + 1,
          startIndex: prev.currentPage * 5,
          endIndex: (prev.currentPage + 1) * 5,
          list: [...prev.list, ...res.data.body.calls],
          end: res.data.body.end,
        };
      });
    } catch (error) {
      console.log(error);
      setCallFilter({ startDate: null, endDate: null });
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: `${error.response.data.error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  const nextHandler = () => {
    if (!pagination.end) {
      if (pagination.currentPage === pagination.loadedPages) {
        setCompLoading(true);
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
      if (pagination.currentPage !== pagination.loadedPages) {
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

  const prevHandler = () => {
    if (pagination.currentPage > 1) {
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
  return [loadFunction, fetchMore, nextHandler, prevHandler];
};

export default useCallPagination;
