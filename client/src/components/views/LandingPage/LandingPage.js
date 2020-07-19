import React, { useState } from "react";
import { Radio, Row, Col, Card } from "antd";
import Search from "antd/lib/input/Search";
import { RocketOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBoxGroup from "./Sections/CheckBoxGroup";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const renderCards =
    Products &&
    Products.map((product, idx) => {
      return (
        <Col key={idx} lg={6} md={8} xs={24}>
          <Card hoverable={true} cover={<ImageSlider />}>
            <Meta title={product.title} description />
          </Card>
        </Col>
      );
    });

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
          <CheckBoxGroup />
          <span>name</span>
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <Radio value> name </Radio>
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

      {Products.length === 0 ? (
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
        <button onClick>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
