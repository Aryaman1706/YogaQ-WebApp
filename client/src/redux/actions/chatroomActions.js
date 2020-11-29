import { SHOW_DRAWER } from "../types";

// * Set Drawer Visibility
export const setDrawer = (value) => async (dispatch) => {
  dispatch({
    type: SHOW_DRAWER,
    payload: value,
  });
};
