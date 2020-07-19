import React from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";

function FileUpload() {
  const onDrop = files => {};

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
        <div onClick>
          <img
            src
            alt
            style={{ minWidth: "300px", width: "300px", height: "240px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
