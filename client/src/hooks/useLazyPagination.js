import { useState } from "react";
import Swal from "sweetalert2";
import axios from "../utils/axios";

/**
@description Fetches data lazily by invoking loadFuction returns them in a paginated fashion
*/
const useLazyPagination = ({
  endpoint,
  doctorId,
  pagination,
  setPagination,
  callFilter,
  setCallFilter,
  setCompLoading,
  setLoadMore,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * @description intial load function, fetches the very first page of any filter constraints
   */
  const loadFunction = async () => {
    try {
      setIsLoaded(false);
      const res = await axios.get(
        `${endpoint}${doctorId}/?page=1&startDate=${callFilter.startDate}&endDate=${callFilter.endDate}`
      );

      setPagination(() => {
        return {
          loadedPages: 1,
          currentPage: 1,
          startIndex: 0,
          endIndex: 5,
          list: res.data.body.chatrooms,
          end: res.data.body.end,
        };
      });
      setIsLoaded(true);
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

  /**
   * @description subsequent load function, fetches the next page(current + 1) of any filter constraints
   */
  const fetchMore = async () => {
    try {
      const res = await axios.get(
        `${endpoint}${doctorId}/?page=${pagination.loadedPages + 1}&startDate=${
          callFilter.startDate
        }&endDate=${callFilter.endDate}`
      );

      setPagination((prev) => {
        return {
          loadedPages: prev.loadedPages + 1,
          currentPage: prev.currentPage + 1,
          startIndex: prev.currentPage * 5,
          endIndex: (prev.currentPage + 1) * 5,
          list: [...prev.list, ...res.data.body.chatrooms],
          end: res.data.body.end,
        };
      });
      setLoadMore(false);
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

  return [loadFunction, fetchMore, nextHandler, prevHandler, isLoaded];
};

export default useLazyPagination;
