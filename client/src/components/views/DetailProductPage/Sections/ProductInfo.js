import React from "react";
import { Descriptions, Button } from "antd";

function ProductInfo(props) {
  const addToCarthandler = () => {
    props.addToCarthandler(props.data._id);
  };

  return (
    <>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{props.data.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{props.data.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.data.views}</Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {props.data.description}
        </Descriptions.Item>
      </Descriptions>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button
          size="large"
          shape="round"
          type="danger"
          onClick={addToCarthandler}
        >
          Add to Cart
        </Button>
      </div>
    </>
  );
}

export default ProductInfo;
