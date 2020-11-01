import styled from "styled-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBrandAction } from "../store/filter/filter.action";

export default function Filter() {
  const dispatch = useDispatch();

  const selectedBrand = useSelector((state) => state.filterState.brand);
  // const checkActive=

  const availableBrands = ["samsung", "vision", "hisense", "vitron", "sony"];

  const StyledFilter = styles;

  return (
    <StyledFilter>
      <h4>BRANDS</h4>
      <p
        onClick={() => dispatch(setBrandAction(null))}
        className={selectedBrand ? "" : "activeBrand"}
      >
        All
      </p>
      {availableBrands.map((brand) => (
        <p
          key={brand}
          onClick={() => dispatch(setBrandAction(brand))}
          className={selectedBrand === brand ? "activeBrand" : ""}
        >
          {brand}
        </p>
      ))}
    </StyledFilter>
  );
}
const styles = styled.div`
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);

  p {
    text-transform: capitalize;
    padding: 5px;
    border-radius: 3px;
  }
  .activeBrand {
    color: white;
    background-color: #17a2b8;
  }

  /* height: 100%;   */
`;
