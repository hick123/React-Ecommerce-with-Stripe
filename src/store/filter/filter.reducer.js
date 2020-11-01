import { SET_BRAND, SET_CATEGORY } from "./filter.type";

const initialState = {
  brand: null,
  category: null,
  error: null,
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BRAND:
      return {
        ...state,
        brand: action.payload,
      };

    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return { ...state };
  }
};
