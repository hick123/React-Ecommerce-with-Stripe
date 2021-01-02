import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import styled from "styled-components";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payments";

function App() {
  const MainWrapper = styles;
  return (
    <Router>
      <MainWrapper>
        <Header />

        <main>
          <Switch>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/payments">
              <Payment />
            </Route>
            <Route path="/">
              <Shop />
            </Route>
          </Switch>
        </main>

        {/* <footer class="footer">
          <p>Footer</p>
        </footer> */}
      </MainWrapper>
    </Router>
  );
}

export default App;
const styles = styled.div`
  /* background-color: #f5f5f5; */
  main {
    max-width: 998px;
    margin: 70px auto;
    margin-bottom: 50px;
  }
  .footer {
    /* position: fixed; */
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: red;
    color: white;
    text-align: center;
  }
  /* display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  } */
`;
