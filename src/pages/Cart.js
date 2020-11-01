import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProductAction,
  updateTotalAction,
} from "../store/cart/cart.action";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import {
  decreaseProductCountAction,
  increaseProductCountAction,
} from "../store/cart/cart.action";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import CartSummary from "../components/CartSummary";
export default function Cart() {
  const dispatch = useDispatch();
  let history = useHistory();

  const cart_items = useSelector((state) => state.cartState.cart_items);

  useEffect(() => {
    // refCartItems.current.w;
    dispatch(updateTotalAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart_items]);

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

          <Button
            variant="info"
            className="checkout-btn"
            onClick={() => history.push("/shop")}
          >
            Shop
          </Button>
        </div>
      )}
      {cart_items.length > 0 && (
        <Row>
          <Col md={8}>
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
                          <Button
                            variant="info"
                            onClick={() =>
                              dispatch(decreaseProductCountAction(cart_item))
                            }
                            className="quantity-icon-btn"
                          >
                            -
                          </Button>

                          <span className="product-qty">
                            {cart_item.quantity}
                          </span>

                          <Button
                            variant="info"
                            className="quantity-icon-btn"
                            onClick={() =>
                              dispatch(increaseProductCountAction(cart_item))
                            }
                          >
                            +
                          </Button>
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
                        <Button
                          variant="danger"
                          className="quantity-icon-btn"
                          onClick={() =>
                            dispatch(removeProductAction(cart_item))
                          }
                        >
                          x
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
          <Col md={4}>
            <CartSummary />
          </Col>
        </Row>
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