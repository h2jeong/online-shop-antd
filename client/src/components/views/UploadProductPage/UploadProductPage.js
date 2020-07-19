import React from "react";
import { Form, Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import FileUpload from "../../utils/FileUpload";
import { withRouter } from "react-router-dom";

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" }
];

function UploadProductPage() {
  const onTitleChange = e => {};
  const onDescriptionChange = e => {};
  const onPriceChange = e => {};
  const onContinentsSelectChange = e => {};

  const onSubmit = e => {
    e.preventDefault();
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
        <FileUpload />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} />
        <br />
        <br />
        <label>Price($)</label>
        <Input type="number" onChange={onPriceChange} />
        <br />
        <br />
        <select onChange={onContinentsSelectChange}>
          <option value>value</option>
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default withRouter(UploadProductPage);
