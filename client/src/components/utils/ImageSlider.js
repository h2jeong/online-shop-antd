import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <Carousel autoplay>
      {props.images.map((img, idx) => (
        <div key={idx}>
          <img
            style={{ width: "100%", height: "150px" }}
            src={`http://localhost:8000/${img}`}
            alt="images"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
