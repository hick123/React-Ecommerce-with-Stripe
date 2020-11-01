/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import superagent from "superagent";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedBrand = useSelector((state) => state.filterState.brand);
  const getBrand = selectedBrand ? `?brand=${selectedBrand}` : "";

  const fetchProducts = () => {
    setLoading(true);
    superagent
      .get(`http://localhost:4000/db/products${getBrand}`)
      .then((res) => {
        setLoading(false);
        setProducts(res.body);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedBrand]);

  const placeholder = () => {
    let content = [];
    for (let i = 0; i < 15; i++) {
      content.push(
        <Col sm={6} md={3}>
          <ContentLoader viewBox="0 0 500 420" height={150} width={200}>
            <rect x="16" y="17" rx="0" ry="0" width="360" height="200" />
            <circle cx="35" cy="248" r="20" />
            <rect x="69" y="229" rx="2" ry="2" width="275" height="15" />
            <rect x="69" y="253" rx="2" ry="2" width="140" height="15" />
          </ContentLoader>
        </Col>
      );
    }

    return content;
  };

  const StyledProducts = styles;

  return (
    <StyledProducts>
      <div className="products">
        <Row>
          {loading && placeholder()}

          {!loading && (
            <>
              {products.map((product) => (
                <Col sm={6} md={3} key={product.id}>
                  <ProductItem product={product} />
                </Col>
              ))}
            </>
          )}

          {!loading && products.length === 0 && (
            <div className="out-of-stock"> Out of stock</div>
          )}
        </Row>
      </div>
    </StyledProducts>
  );
}
const styles = styled.div`
  background-color: #fff;
  border-radius: 3px;
  padding: 18px 12px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
  height: 100%;

  .out-of-stock {
    margin: auto;
  }
`;
