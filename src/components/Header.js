import React, { useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTotalAction } from "../store/cart/cart.action";
import { HiShoppingCart, HiOutlineShoppingCart } from "react-icons/hi";
import styled from "styled-components";
import logo from "../assets/logo.svg";

export default function Header() {
  const dispatch = useDispatch();
  let history = useHistory();
  const cart_items = useSelector((state) => state.cartState.cart_items);
  const total = useSelector((state) => state.cartState.total);

  useEffect(() => {
    // refCartItems.current.w;
    dispatch(updateTotalAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart_items]);

  const HeaderWrapper = styles;
  return (
    <HeaderWrapper>
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <img
              src={logo}
              alt=""
              className="logo"
              onClick={() => history.push("/")}
            />
          </div>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" exact activeClassName="activeLink">
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/payments" exact activeClassName="activeLink">
                Test Payments
              </NavLink>
            </li>
          </ul>

          <div className="menu-right">
            <NavLink to="/cart" exact activeClassName="activeLink">
              <div className="cart-link">
                <div className="cart-basket">
                  {cart_items.length < 1 ? (
                    <HiOutlineShoppingCart className="cart-icon" />
                  ) : (
                    <HiShoppingCart className="cart-icon" />
                  )}
                  <div className="badge cart-count" pill>
                    {total.count}
                  </div>
                </div>
                <p>Cart</p>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </HeaderWrapper>
  );
}
const styles = styled.div`
  background-color: #fff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;

  .activeLink {
    color: #ff5c5c;
  }
  a {
    color: #000;
    text-decoration: none;
  }

  .logo {
    height: 26px;
    cursor: pointer;
  }

  .navbar {
    max-width: 998px;
    margin: 0 auto;
    background-color: #fff;
    padding: 5px;
  }
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0 5px;
    list-style: none;
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }
  /* .nav {
    display: flex;
    align-items: center;
    padding: 0;
  }

  ul {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0 5px;
    list-style: none;
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }
  li:hover {
    color: #17a2b8;
  } */
  /* .navbar-nav {
    display: flex;
  } */
  .menu-right {
    display: flex;
    align-items: center;
  }
  .dropdown {
    margin-right: 10px;
  }
  .cart-link {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .cart-link:hover {
    color: #ff5c5c;
  }
  .cart-link p {
    margin: auto 2px;
  }
  .cart-basket {
    width: 40px;
    position: relative;
  }
  .cart-basket img {
    object-fit: cover;
  }
  .cart-icon {
    font-size: 20px;
  }

  .cart-count {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 11px;
    font-weight: 700;
    left: 43%;
    background-color: #ff5c5c;
    /* padding: 0; */
    margin: 0;
  }
`;
