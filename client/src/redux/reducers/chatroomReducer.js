import { SHOW_DRAWER } from "../types";

const defaultState = {
  showDrawer: false,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return {
        ...state,
        showDrawer: action.payload,
      };
    default:
      return state;
  }
};

export default stateHandler;
