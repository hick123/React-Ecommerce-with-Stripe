import React from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import styled from "styled-components";

export default function Shop() {
  const StyledShop = styles;

  return (
    <StyledShop>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <Filter />
          </div>
          <div className="col-sm-12 col-md-8">
            <Products />
          </div>
        </div>
      </div>
    </StyledShop>
  );
}
const styles = styled.div`
  display: flex;
  /* height: 100vh; */
  height: calc(100vh - 120px);
`;
