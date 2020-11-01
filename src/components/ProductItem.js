import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import {
  addProductAction,
  decreaseProductCountAction,
  increaseProductCountAction,
} from "../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import addToCart from "../assets/twotone-add-shopping-cart.svg";
import { currencyFormatter } from "../utils/curencyFormatter";
import config from "../config/config.json";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const cart_items = useSelector((state) => state.cartState.cart_items);

  const checkIfExist = cart_items.find((item) => item.id === product.id);

  const StyledProductItem = styles;

  return (
    <StyledProductItem>
      <div className="product-item">
        <div className="product-image">
          <img src={`${config.API_URL}/${product.imgUrl}`} alt={product.name} />
        </div>
        <div className="title">{product.name}</div>

        <div className="product-price">
          {currencyFormatter.format(product.price)}
        </div>

        {checkIfExist ? (
          <div className="change-quantity">
            <Button
              variant="info"
              onClick={() => dispatch(decreaseProductCountAction(product))}
              className="quantity-icon-btn"
            >
              -
            </Button>

            <span>{checkIfExist?.quantity}</span>

            <Button
              variant="info"
              className="quantity-icon-btn"
              onClick={() => dispatch(increaseProductCountAction(product))}
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            variant="info"
            onClick={() => dispatch(addProductAction(product))}
            block
            className="add-to-cart"
          >
            <img src={addToCart} alt="" />
            add to cart
          </Button>
        )}
      </div>
    </StyledProductItem>
  );
}
const styles = styled.div`
  transition-duration: 0.3s;
  transition-timing-function: linear;
  padding: 3px;
  margin-bottom: 13px;

  :hover {
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
    transform: scale3d(1.1, 1.1, 1.1);
    backface-visibility: hidden;
  }

  .title {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    padding: 0 5px;
  }
  .product-price {
    font-size: 13px;
    font-weight: 600;
  }
  .product-item {
    border-color: #000;
    background-color: #fff;
  }
  .product-image img {
    width: 100%;
    height: auto;
  }
  .add-to-cart {
    text-transform: uppercase;
    font-size: 13px;
    display: flex;
    justify-content: space-around;
  }
  .add-to-cart img {
    height: 18px;
  }
  .change-quantity {
    display: flex;
    justify-content: space-between;
  }
  .quantity-icon-btn {
    font-size: 13px;
    /* font-weight: 800; */
  }
  .quantity-icon-btn img {
    height: 30px;
  }
`;
