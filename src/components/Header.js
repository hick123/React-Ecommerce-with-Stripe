import React, { useEffect } from "react";
import { Navbar, Nav, Badge, Dropdown } from "react-bootstrap";
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
      <Navbar className="navbar">
        <Navbar.Brand>
          <img
            src={logo}
            alt=""
            className="logo"
            onClick={() => history.push("/")}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto">
            <ul>
              <li>
                <NavLink to="/" exact activeClassName="activeLink">
                  Shop
                </NavLink>
              </li>

              <li>
                <NavLink to="/payments" exact activeClassName="activeLink">
                  Payments
                </NavLink>
              </li>
            </ul>
          </Nav>

          <div className="menu-right">
            <Dropdown className="dropdown">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Dashboard
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <NavLink to="/payments" exact activeClassName="activeLink">
                    Payments
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>Orders</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <NavLink to="/cart" exact activeClassName="activeLink">
              <div className="cart-link">
                <div className="cart-basket">
                  {cart_items.length < 1 ? (
                    <HiOutlineShoppingCart className="cart-icon" />
                  ) : (
                    <HiShoppingCart className="cart-icon" />
                  )}
                  <Badge variant="info" className="cart-count" pill>
                    {total.count}
                  </Badge>
                </div>
                <p>Cart</p>
              </div>
            </NavLink>
          </div>
        </Navbar.Collapse>
      </Navbar>
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
    color: #17a2b8;
  }
  a {
    color: #000;
    text-decoration: none;
  }

  .logo {
    height: 30px;
  }

  .navbar {
    max-width: 998px;
    margin: 0 auto;
    background-color: #fff;
    /* height: 100%; */
  }
  .nav {
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
  }

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
    color: #17a2b8;
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
    /* padding: 0; */
    margin: 0;
  }
`;
