import React, { useState, useEffect } from "react";
import { Row, Col, Card, message } from "antd";
import Search from "antd/lib/input/Search";
import { RocketOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBoxGroup from "./Sections/CheckBoxGroup";
import axios from "axios";
import { continents, price } from "./Sections/data";
import RadioBox from "./Sections/RadioBox";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.post("/api/product/getProducts").then(res => {
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        message.error("Failed to get Product List");
      }
    });
  };

  const renderCards = Products.map(product => {
    return (
      <Col lg={6} md={12} xs={24} key={product._id}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const onLoadMore = () => {};

  const handleFilters = () => {};

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <RocketOutlined />{" "}
        </h2>
      </div>

      {/* Filter */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* CheckBox */}
          <CheckBoxGroup list={continents} handleFilters={handleFilters} />
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <RadioBox list={price} handleFilters={handleFilters} />
        </Col>
      </Row>

      {/* Search */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto"
        }}
      >
        <div>
          <Search
            placeholder="input search text"
            onChange
            style={{ width: 200 }}
            value
          />
        </div>
      </div>

      {/* Cards */}
      {Products.length < 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h2>No Post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={onLoadMore}>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
