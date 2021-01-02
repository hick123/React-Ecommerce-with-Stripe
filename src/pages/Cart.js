import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProductAction,
  decreaseProductCountAction,
  increaseProductCountAction,
} from "../store/cart/cart.action";
import styled from "styled-components";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import CartSummary from "../components/CartSummary";

export default function Cart() {
  const dispatch = useDispatch();
  let history = useHistory();

  const cart_items = useSelector((state) => state.cartState.cart_items);

  const handleDecrease = (cart_item) => {
    dispatch(decreaseProductCountAction(cart_item));
  };

  const handleIncrease = (cart_item) => {
    dispatch(increaseProductCountAction(cart_item));
  };

  const CartWrapper = styles;

  return (
    <CartWrapper>
      <h4>Cart</h4>
      {cart_items.length < 1 && (
        <div className="empty-cart">
          <div className="empty-cart-icon-wrapper">
            <HiOutlineShoppingCart className="empty-cart-icon" />
          </div>
          <h3>Your cart is empty</h3>
          <div
            className="btn checkout-btn"
            onClick={() => history.push("/shop")}
          >
            Shop
          </div>
        </div>
      )}
      {cart_items.length > 0 && (
        <div className="row">
          <div className="col-sm-12  col-md-8">
            <div className="table-cart">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Each</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart_items.map((cart_item) => (
                    <tr key={cart_item.id}>
                      <td>
                        <div className="product-name-img">
                          <div className="img-product">
                            <img
                              src={cart_item.imgUrl}
                              alt=""
                              className="mCS_img_loaded"
                            />
                          </div>
                          <div className="name-product">{cart_item.name}</div>
                        </div>
                      </td>
                      <td>KES {cart_item.price.toLocaleString("en")}</td>

                      <td className="product-count">
                        <div className="change-quantity">
                          <div
                            className="btn quantity-icon-btn"
                            onClick={() => handleDecrease(cart_item)}
                          >
                            -
                          </div>

                          <span className="product-qty">
                            {cart_item.quantity}
                          </span>

                          <div
                            className="btn quantity-icon-btn"
                            onClick={() => handleIncrease(cart_item)}
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="total">
                          {(
                            cart_item.quantity * cart_item.price
                          ).toLocaleString("en")}
                        </div>
                      </td>
                      <td>
                        <div
                          className="btn btn-danger quantity-icon-btn"
                          onClick={() =>
                            dispatch(removeProductAction(cart_item))
                          }
                        >
                          x
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <CartSummary />
          </div>
        </div>
      )}
    </CartWrapper>
  );
}
const styles = styled.div`
  height: 80vh;

  /* background-color: #fff; */

  //empty cart
  .empty-cart {
    width: 100%;
    /* height: 60vh; */
    display: flex;
    flex-direction: column;
    background-color: #ff5c5c;
    color: #fff;
    justify-content: center;
    align-items: center;
  }
  .empty-cart-icon-wrapper {
    padding: 30px;
    background-color: #fff;
    color: #000;
    border-radius: 50%;
  }
  .empty-cart-icon {
    font-size: 59px;
  }

  //cart items
  .table-cart {
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
    overflow-y: auto;
    height: 100%;
  }
  .table-cart table {
    width: 100%;
  }
  .table-cart table thead {
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 5px;
  }
  .table-cart thead tr th {
    padding: 8px 0 18px;
    color: #484848;
    font-size: 15px;
    font-weight: 400;
  }
  .table-cart tr td {
    padding: 40px 0 27px;
    vertical-align: middle;
  }

  .table-cart tr td:nth-child(1) {
    width: 40%;
  }
  .table-cart tr td:nth-child(2) {
    width: 12%;
  }
  .table-cart tr td:nth-child(3) {
    width: 22%;
  }
  .table-cart tr td:nth-child(4) {
    width: 13.333%;
  }
  .table-cart tr td:nth-child(5) {
    width: 8.667%;
    text-align: right;
  }
  .product-name-img {
    display: flex;
    align-items: center;
  }
  .img-product {
    width: 72px;
    margin-left: 8px;
    margin-right: 21px;
    line-height: 63px;
  }

  .img-product img {
    width: 100%;
  }
  .name-product {
    font-size: 15px;
    color: #484848;
    padding-top: 8px;
  }
  .price {
    text-align: right;
    line-height: 64px;
    color: #989898;
    font-size: 13px;
  }
  .product-qty {
    padding: 10px;
  }

  .quantity-icon-btn {
    background-color: #ff5c5c;
    color: #fff;
  }

  .total {
    font-size: 24px;
  }
  .display-flex {
    display: flex;
  }
  .align-center {
    align-items: center;
  }
`;
