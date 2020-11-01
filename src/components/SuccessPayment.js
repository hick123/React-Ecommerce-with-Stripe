import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";

export default function SuccessPayment({ metadata }) {
  let history = useHistory();
  const StyledSuccessPayment = styles;

  return (
    <StyledSuccessPayment>
      <FaCheckCircle className="success-icon" />

      <p>Payment completed successfully</p>

      <Button
        variant="info"
        className="shop-btn"
        onClick={() => history.push("/shop")}
      >
        Shop
      </Button>
    </StyledSuccessPayment>
  );
}
const styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
  max-width: 50%;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 3px;

  .success-icon {
    color: green;
    font-size: 50px;
  }

  p {
    font-size: 20px;
  }
`;
