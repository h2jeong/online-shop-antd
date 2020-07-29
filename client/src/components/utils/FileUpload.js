import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = files => {
    let formData = new FormData();
    formData.append("file", files[0]);
    const config = { header: { "content-type": "multipart/form-data" } };

    axios.post("/api/product/uploadImages", formData, config).then(res => {
      if (res.data.success) {
        setImages([...Images, res.data.image]);
        props.onRefresh([...Images, res.data.image]);
      } else {
        message.error("Failed to upload image");
      }
    });
  };

  const onDelete = img => {
    let imgIndex = Images.indexOf(img);
    let imgArray = Images.slice();
    if (imgIndex > -1) {
      imgArray.splice(imgIndex, 1);
    }

    setImages(imgArray);
    props.onRefresh(imgArray);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={8000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll"
        }}
      >
        {Images.map((img, idx) => (
          <div key={idx} onClick={() => onDelete(img)}>
            <img
              src={`http://localhost:8000/${img}`}
              alt={`img_${idx}`}
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
