import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
// import stripeIcon from "../assets/stripe.svg";
import { useHistory } from "react-router-dom";
import { currencyFormatter } from "../utils/curencyFormatter";

export default function CartSummary() {
  const CartSummaryWrapper = styles;

  let history = useHistory();
  const total = useSelector((state) => state.cartState.total);

  return (
    <CartSummaryWrapper>
      <h4>Cart Total </h4>

      <div className="items">
        <span className="title">Total Items</span>
        <span className="amount">{total.count}</span>
      </div>

      <div className="sub-total">
        <span className="title">SubTotal</span>
        <span className="amount">{currencyFormatter.format(total.amount)}</span>
      </div>
      <div className="shipping">
        <span className="title">Shipping </span>
        <span className="amount"> $0</span>
      </div>

      <div className="total-amount">
        <span className="title">Total</span>
        <span className="amount">{currencyFormatter.format(total.amount)}</span>
      </div>

      <div class="d-grid gap-2">
        <div
          className="btn btn-info checkout-btn"
          onClick={() => history.push("/checkout")}
        >
          Checkout
        </div>
      </div>
    </CartSummaryWrapper>
  );
}
const styles = styled.div`
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;

  .sub-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .shipping {
    display: flex;
    justify-content: space-between;
  }

  .items {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .total-amount {
    margin-top: 20px;

    display: flex;
    justify-content: space-between;
  }
  .checkout-btn {
    margin-top: 10px;
  }
  .checkout-btn:hover {
    background-color: #7cccd8ad;
  }
`;
