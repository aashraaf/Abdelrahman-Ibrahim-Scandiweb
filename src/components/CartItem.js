import "../css/CartPage.css";
import React, { Component } from "react";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.product.gallery,
      currentImage: 0,
      pAttributes: this.props.product.selectedAttributes,
      amount: this.props.product.amount,
    };
  }

  componentDidMount() {
    this.props.product.attributes.map((att) => {
      const joined = this.state.pAttributes.concat(att.items[0].value);
      this.setState({ pAttributes: joined });
      return true;
    });
  }

  render() {
    return (
      <>
        <hr
          className="horizontalLine"
          style={
            this.props.small
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
        ></hr>
        <div className="cartItem ">
          <div className="cartInfo  ">
            <h2 className={this.props.small ? "cartBrandSmall" : "cartBrand"}>
              {this.props.product.brand}
            </h2>
            <h2
              className={
                this.props.small
                  ? "cartSpeceficProductSmall"
                  : "cartSpeceficProduct"
              }
            >
              {this.props.product.name}
            </h2>
            {this.props.product.prices
              .filter((price) => price.currency.symbol === this.props.currency)
              .map((filteredPrice, i) => (
                <h2
                  key={i}
                  className={this.props.small ? "cartPriceSmall" : "cartPrice"}
                >
                  {filteredPrice.currency.symbol + "" + filteredPrice.amount}
                </h2>
              ))}

            {this.props.product.attributes.map((att, i) => {
              return (
                <div key={i}>
                  <h2
                    className={
                      this.props.small ? "cartAttTextSmall" : "cartAttText"
                    }
                  >
                    {att.id}:
                  </h2>
                  <div
                    className={
                      this.props.small
                        ? "cartAttributesSmall"
                        : "cartAttributes"
                    }
                  >
                    {att.items.map((item, i2) => {
                      if (this.props.small) {
                        return att.type === "swatch" ? (
                          <div key={i2}>
                            <div
                              className={
                                this.state.pAttributes[i] === item.value
                                  ? "cartSingleAttSelectedSwatchSmall"
                                  : "cartSingleAttSmall"
                              }
                              style={{ backgroundColor: item.displayValue }}
                            ></div>
                          </div>
                        ) : (
                          <div key={i2}>
                            <div
                              className={
                                this.state.pAttributes[i] === item.value
                                  ? "cartSingleAttSelectedSmall"
                                  : "cartSingleAttSmall"
                              }
                            >
                              {item.value}{" "}
                            </div>
                          </div>
                        );
                      } else {
                        return att.type === "swatch" ? (
                          <div key={i2}>
                            <div
                              className={
                                this.state.pAttributes[i] === item.value
                                  ? "cartSingleAttSelectedSwatch"
                                  : "cartSingleAtt"
                              }
                              style={{ backgroundColor: item.displayValue }}
                            ></div>
                          </div>
                        ) : (
                          <div key={i2}>
                            <div
                              className={
                                this.state.pAttributes[i] === item.value
                                  ? "cartSingleAttSelected"
                                  : "cartSingleAtt"
                              }
                            >
                              {item.value}{" "}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={this.props.small ? "cartOptSmall" : "cartOpt"}>
            <div className="imgOptions">
              <h2
                className={this.props.small ? "cartButtonSmall" : "cartButton"}
                onClick={() => {
                  // this.setState({amount:this.state.amount+1})
                  this.props.addToCartAttributes(
                    this.props.product,
                    this.props.product.selectedAttributes
                  );
                }}
              >
                +
              </h2>
              <h2
                className={this.props.small ? "cartCount" : "cartCount"}
                style={this.props.small ? { fontSize: "16px" } : {}}
              >
                {this.props.product.amount}
              </h2>
              <h2
                className={this.props.small ? "cartButtonSmall" : "cartButton"}
                style={
                  this.props.small
                    ? { lineHeight: "20px" }
                    : { lineHeight: "30px" }
                }
                onClick={() => {
                  if (this.props.product.amount > 1) {
                    // this.setState({amount:this.state.amount-1})
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
                    src={require("../files/right.png")}
                    onClick={() => {
                      this.setState({
                        currentImage: this.state.currentImage + 1,
                      });
                    }}
                  ></img>
                  <img
                    alt=""
                    className="arrowLCartImg"
                    src={require("../files/left.png")}
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
                className={
                  this.props.small ? "smallCartImgSmall" : "smallCartImg"
                }
                src={
                  this.props.product.gallery[
                    this.state.currentImage % this.props.product.gallery.length
                  ]
                }
              ></img>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartItem;
