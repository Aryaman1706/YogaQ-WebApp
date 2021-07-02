import React from "react";
import Appbar from "../../Components/Common/Appbar";
import Calls from "../../Components/Doctor/Calls/Calls";
import DoctorLayout from "../../layout/DoctorLayout";

const CallListing = () => {
  return (
    <Appbar type={"doctor"}>
      <DoctorLayout>
        <Calls />
      </DoctorLayout>
    </Appbar>
  );
};

export default CallListing;
