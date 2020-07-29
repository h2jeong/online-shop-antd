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
  const [Skip, setSkip] = useState(0);
  const Limit = 8;
  const [Filters, setFilters] = useState({ continents: [], price: [] });
  const [Term, setTerm] = useState("");

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit
    };
    getProducts(variables);
  }, []);

  const getProducts = variables => {
    // console.log(variables);
    axios.post("/api/product/getProducts", variables).then(res => {
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        message.error("Failed to get Product List");
      }
    });
  };

  const onLoadMore = () => {
    let updateSkip = Skip + Limit;
    const variables = {
      skip: updateSkip,
      limit: Limit,
      filters: Filters,
      term: Term
    };
    getProducts(variables);
    setSkip(0);
  };

  const handleFilters = (filterArr, category) => {
    let variables = {
      skip: Skip,
      limit: Limit,
      filters: { ...Filters, [category]: filterArr },
      term: Term
    };
    setFilters({ ...Filters, [category]: filterArr });

    // filterArr.length === 0 ? server routes로 throw
    getProducts(variables);
    setSkip(0);
  };

  const handleSearchTerm = e => {
    let variables = {
      skip: Skip,
      limit: Limit,
      filters: Filters,
      term: e.target.value
    };

    setTerm(e.target.value);
    getProducts(variables);
    setSkip(0);
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
          <CheckBoxGroup
            list={continents}
            handleFilters={filterArr => handleFilters(filterArr, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <RadioBox
            list={price}
            handleFilters={filterArr => handleFilters(filterArr, "price")}
          />
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
            onChange={handleSearchTerm}
            style={{ width: 200 }}
            value={Term}
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
      {Products.length >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onLoadMore}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
