import React from "react";
import { Carousel } from "antd";

function ImageSlider() {
  return (
    <Carousel autoplay>
      <div key={idx}>
        <img style={{ width: "100%", height: "150px" }} src alt />
      </div>
    </Carousel>
  );
}

export default ImageSlider;
