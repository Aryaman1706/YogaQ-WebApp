import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import enquiryReducer from "./enquiryReducer";
import doctorReducer from "./doctorReducer";
import userReducer from "./userReducer";

export default combineReducers({
  user: userReducer,
  admin: adminReducer,
  doctor: doctorReducer,
  enquiry: enquiryReducer,
});
