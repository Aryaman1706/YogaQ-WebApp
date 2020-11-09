import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import enquiryReducer from "./enquiryReducer";

export default combineReducers({
  admin: adminReducer,
  enquiry: enquiryReducer,
});
