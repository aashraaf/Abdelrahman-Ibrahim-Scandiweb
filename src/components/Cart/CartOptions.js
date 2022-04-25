import "../../css/CartPage.css";
import React, { Component } from "react";

class CartOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    };
  }

  render() {
    return (
      <div className={this.props.small ? "cartOptSmall" : "cartOpt"}>
        <div className="imgOptions">
          <h2
            className={this.props.small ? "cartButtonSmall" : "cartButton"}
            onClick={() => {
              this.props.addToCartAttributes(
                this.props.product,
                this.props.product.selectedAttributes
              );
            }}
          >
            +
          </h2>
          <h2
            className={this.props.small ? "cartCountSmall" : "cartCount"}
          >
            {this.props.product.amount}
          </h2>
          <h2
            className={this.props.small ? "cartButtonSmallD" : "cartButtonD"}
            
            onClick={() => {
              if (this.props.product.amount > 1) {
                this.props.removeFromCart(this.props.product, false);
              } else this.props.removeFromCart(this.props.product, true);
            }}
          >
            -
          </h2>
        </div>
        <div className="smallImg">
          {!this.props.small ? (
            <div>
              <img
                alt=""
                className="arrowRCartImg"
                src={require("../../files/right.png")}
                onClick={() => {
                  this.setState({
                    currentImage: this.state.currentImage + 1,
                  });
                }}
              ></img>
              <img
                alt=""
                className="arrowLCartImg"
                src={require("../../files/left.png")}
                onClick={() => {
                  this.state.currentImage === 0
                    ? this.setState({
                        currentImage: this.props.product.gallery.length - 1,
                      })
                    : this.setState({
                        currentImage: this.state.currentImage - 1,
                      });
                }}
              ></img>
            </div>
          ) : (
            <></>
          )}
          <img
            alt=""
            className={this.props.small ? "smallCartImgSmall" : "smallCartImg"}
            src={
              this.props.product.gallery[
                this.state.currentImage % this.props.product.gallery.length
              ]
            }
          ></img>
        </div>
      </div>
    );
  }
}

export default CartOptions;
