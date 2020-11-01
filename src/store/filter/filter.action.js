import { SET_BRAND, SET_CATEGORY } from "./filter.type";

export const setBrandAction = (brand) => ({
  type: SET_BRAND,
  payload: brand,
});

export const setCategoryAction = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});
