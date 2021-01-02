import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import SuccessPayment from "./SuccessPayment";
import { currencyFormatter } from "../utils/curencyFormatter";
import superagent from "superagent";
import { clearCartAction } from "../store/cart/cart.action";
import config from "../config/config.json";

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cartState.total);

  const [clientSecret, setClientSecret] = useState(null);

  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    superagent
      .post(`${config.API_URL}/create-payment-intent`)
      .send({
        payment_method_types: ["card"],
        amount: total.amount,
      })
      .then((res) => setClientSecret(res.body.client_secret))
      .catch(console.error);
  }, [total.amount]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      console.log("[error]", payload.error);
    } else {
      //saving order to the database
      // superagent
      //   .post(`${config.API_URL_LOCAL}/db/orders`)
      //   .send({
      //     name: ev.target.name.value,
      //     amount: total.amount,
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      setError(null);
      setSucceeded(true);
      setProcessing(false);
      setMetadata(payload.paymentIntent);
      console.log("[PaymentIntent]", payload.paymentIntent);
      dispatch(clearCartAction());
    }
  };

  const renderSuccess = () => {
    return <SuccessPayment metadata={metadata} />;
  };

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };
    const StyledRenderForm = styles;

    return (
      <StyledRenderForm>
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">For demo purposes</h4>
          <p>
            Card: 4242 4242 4242 4242 <br /> Exp: 01/21 <br />
            CVC: 123 <br />
            ZIP: 99501
          </p>
          <hr />

          <p className="mb-0">
            Or use 3D Secure card <br /> Card: 4000 0000 0000 3220
          </p>
        </div>
        <h4>Amount to be paid : {currencyFormatter.format(total.amount)}</h4>
        <form className="form">
          {/* <Form.Label>Name on Card</Form.Label> */}
          <input
            id="name"
            name="name"
            placeholder="Full name"
            autoComplete="cardholder"
            className="form-control"
          />

          <CardElement
            className="form-control sr-card-element"
            options={options}
            onReady={() => {
              console.log("CardElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardElement [blur]");
            }}
            onFocus={() => {
              console.log("CardElement [focus]");
            }}
          />
          <hr />
          {error && <div className="message sr-field-error">{error}</div>}
          <div class="d-grid gap-2">
            <div
              className="btn btn-info checkout-btn"
              disabled={processing || !clientSecret || !stripe}
              onClick={handleSubmit}
            >
              {processing ? "Processing…" : "Pay"}
            </div>
          </div>
        </form>
      </StyledRenderForm>
    );
  };

  return <> {succeeded ? renderSuccess() : renderForm()}</>;
}
const styles = styled.div`
  /* display: flex; */

  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
  width: min-content;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 3px;
  h4 {
    text-align: center;
    margin: 10px 0;
  }

  .form {
    width: 400px;
    background-color: #fff;
    padding: 20px;
  }
  input {
    margin-bottom: 10px;
  }
  .form-row {
    margin: 0;
  }

  .card-input {
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 0 0 5px 5px;

    /* border-color: #000; */
  }
  .pay-btn {
    margin-top: 20px;
  }
`;
