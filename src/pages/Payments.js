import React, { useState, useEffect } from "react";
import config from "../config/config.json";
import superagent from "superagent";
import DataTable from "react-data-table-component";
import { currencyFormatter } from "../utils/curencyFormatter";
import moment from "moment";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  const fetchPayments = () => {
    setLoading(true);
    superagent
      .get(`${config.API_URL}/payments`)
      .then((res) => {
        setLoading(false);
        setPayments(res.body.data);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const columns = [
    {
      name: "Index",
      selector: (row, index) => index,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row, index) => currencyFormatter.format(row.amount / 100),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row, index) =>
        row.status === "succeeded" ? (
          <div className="bg-success">Succeeded</div>
        ) : (
          <div className="bg-danger">Failed</div>
        ),
      sortable: true,
    },
    {
      name: "Amount charged",
      selector: (row, index) =>
        currencyFormatter.format(row.amount_captured / 100),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row, index) =>
        moment.unix(row.created).format("MMM Do YY, h:mm a"),
      sortable: true,
    },
  ];

  return (
    <div className="container">
      <DataTable
        title="Payment List (test payments)"
        columns={columns}
        data={payments}
        progressPending={loading}
        pagination
        key="index"
      />
    </div>
  );
};
export default Payment;
