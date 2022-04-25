import "../../css/ProductPage.css";
import React, { Component } from "react";

class ProductSmallImg extends Component {
  render() {
    return (
      <div className="smallImgs">
        {this.props.product.gallery.map((image, i) => {
          return this.props.image === image ? (
            <img
              alt=""
              key={i}
              className="smallCardImgSelected"
              src={image}
            ></img>
          ) : (
            <img
              alt=""
              key={i}
              className="smallCardImg"
              src={image}
              onClick={() => this.props.changeImage(image)}
            ></img>
          );
        })}
      </div>
    );
  }
}

export default ProductSmallImg;
