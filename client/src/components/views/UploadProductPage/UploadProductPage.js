import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import FileUpload from "../../utils/FileUpload";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" }
];

function UploadProductPage(props) {
  const [Product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    continent: 1,
    images: []
  });

  const onHandleChange = e => {
    const { name, value } = e.currentTarget;
    setProduct({ ...Product, [name]: value });
  };

  const onRefresh = newImages => {
    setProduct({ ...Product, images: [...newImages] });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (
      !Product.title ||
      !Product.description ||
      !Product.price ||
      !Product.images.length
    ) {
      return message.warning("Fill the all inputs");
    }

    axios.post("/api/product/uploadProduct", Product).then(res => {
      if (res.data.success) {
        message.info("Product Successsfully Uploaded");
        props.history.push("/");
      } else {
        message.error("Failed to upload product");
      }
    });
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem"
        }}
      >
        <Title level={3}>Upload Travel Product</Title>
      </div>
      <Form onSubmit={onSubmit}>
        {/* Dropzone */}
        <FileUpload onRefresh={onRefresh} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onHandleChange} name="title" />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onHandleChange} name="description" />
        <br />
        <br />
        <label>Price($)</label>
        <Input type="number" onChange={onHandleChange} name="price" />
        <br />
        <br />
        <select
          onChange={onHandleChange}
          name="continent"
          value={Product.continent}
        >
          {Continents.map((item, idx) => (
            <option key={idx} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default withRouter(UploadProductPage);
