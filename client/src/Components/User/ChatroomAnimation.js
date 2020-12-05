import React from "react";
import animation from "../../assets/doctor.json";
import Lottie from "react-lottie";

const ChatroomAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        style={{ display: "block" }}
      />
    </>
  );
};

export default ChatroomAnimation;
