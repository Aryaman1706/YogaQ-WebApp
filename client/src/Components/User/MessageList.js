import React, { useState, useEffect, useRef } from "react";
import Linkify from "react-linkify";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import InfiniteScroll from "react-infinite-scroll-component";

const MessageList = () => {
  const { user_messages, message_end, active_chatroom } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const loadMore = async () => {
    // await dispatch(userActions.setLoading(true));
    await dispatch(userActions.getMessages({ id: active_chatroom._id, page }));
  };
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line
  }, [page]);
  useEffect(() => {
    return () => {
      dispatch(
        userActions.modfiyLastAccess({
          id: active_chatroom._id,
          formData: { lastAccess: new Date() },
        })
      );
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (user_messages.length === 5) {
      ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line
  }, [user_messages]);
  const nextHandler = () => {
    console.log("Next");
    setPage((prev) => {
      return prev + 1;
    });
  };
  const ref = useRef(null);

  return (
    <>
      <InfiniteScroll
        dataLength={1}
        next={nextHandler}
        hasMore={!message_end}
        loader={<h2>Loading...</h2>}
        endMessage={<h2>No more Messages</h2>}
        inverse
      >
        {user_messages.length > 0 &&
          user_messages.reverse().map((item) => {
            return <Linkify></Linkify>;
          })}
        <div ref={ref}>
          <h1>See me</h1>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default MessageList;
