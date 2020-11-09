import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import enquiryReducer from "./enquiryReducer";
import doctorReducer from "./doctorReducer";

export default combineReducers({
  admin: adminReducer,
  enquiry: enquiryReducer,
  doctor: doctorReducer,
});
