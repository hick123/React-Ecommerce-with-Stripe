require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const express = require("express");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.static("uploads"));

app.use(bodyParser.json());

app.use("/db", jsonServer.router("./db.json"));

app.get("/public-key", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.get("/payments", async (req, res) => {
  try {
    const charges = await stripe.charges.list({
      limit: 30,
    });
    // console.log(charges);
    res.json(charges);
  } catch (err) {
    res.json(err);
  }
});

app.post("/create-payment-intent", async (req, res) => {
  const body = req.body;
  console.log("body", body);

  const options = {
    ...body,
    amount: body.amount * 100,
    currency: "usd",
  };
  console.log("options", options);

  try {
    const paymentIntent = await stripe.paymentIntents.create(options);
    console.log("paymentIntent", paymentIntent);
    return res.json(paymentIntent);
  } catch (err) {
    // console.log(err);
    res.json(err);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
