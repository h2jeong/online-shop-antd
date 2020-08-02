import React, { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import Axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

function DetailProductPage(props) {
  const [Product, setProduct] = useState({});
  let productId = props.match.params.productId;

  useEffect(() => {
    let productIds = [];
    productIds.push(productId);

    Axios.get("/api/product/getProductById", {
      params: { productIds }
    }).then(res => {
      console.log(res.data);
      setProduct(res.data.products[0]);
    });
  }, []);

  const addToCarthandler = productId => {
    console.log("cart", productId);
    Axios.post("/api/users/addProductToCart", { productId }).then(res => {
      if (res.data.success) {
        props.history.push("/cart");
      } else {
        message.error("Failed to add Product to Cart");
      }
    });
  };

  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* productImage */}
          <ProductImage data={Product.images} />
        </Col>
        <Col lg={12} xs={24}>
          {/* productInfo */}
          <ProductInfo data={Product} addToCarthandler={addToCarthandler} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
