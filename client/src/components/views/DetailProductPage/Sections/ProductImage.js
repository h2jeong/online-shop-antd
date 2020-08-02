import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.data) {
      let images = [];
      props.data.forEach(image =>
        images.push({
          original: `http://localhost:8000/${image}`,
          thumbnail: `http://localhost:8000/${image}`
        })
      );
      setImages(images);
    }
  }, [props.data]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
