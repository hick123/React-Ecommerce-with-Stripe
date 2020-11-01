import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import superagent from "superagent";
import CheckoutForm from "../components/CheckoutForm";

export default function Checkout() {
  const stripePromise = superagent
    .get(`http://localhost:4000/public-key`)
    .then((res) => loadStripe(res.body.publishableKey))
    .catch(console.error);

  const StyledCheckout = styles;

  return (
    <StyledCheckout>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </StyledCheckout>
  );
}
const styles = styled.div`
  height: 60vh;
`;
