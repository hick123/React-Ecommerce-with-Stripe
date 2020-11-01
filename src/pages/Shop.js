import React from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import styled from "styled-components";

export default function Shop() {
  const StyledShop = styles;

  return (
    <StyledShop>
      <div className="filter-section">
        <Filter />
      </div>
      <div className="products-section">
        <Products />
      </div>
    </StyledShop>
  );
}
const styles = styled.div`
  display: flex;
  /* height: 100vh; */
  height: calc(100vh - 120px);

  .filter-section {
    flex-basis: 25%;
    max-width: 25%;
    min-width: 25%;
    width: 25%;
    /* margin-right:5px; */
  }
  .products-section {
    /* width: 80%; */
    flex-basis: 75%;
    max-width: 75%;
    min-width: 75%;
    width: 75%
    height: 100%;
    padding-left:10px;
    /* overflow-y:auto */

    /* background-color: blueviolet; */
  }
`;
