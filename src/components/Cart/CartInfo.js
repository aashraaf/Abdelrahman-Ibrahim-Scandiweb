import "../../css/CartPage.css";
import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

class CartInfo extends Component {
  render() {
    return (
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
                  this.props.small ? "cartAttributesSmall" : "cartAttributes"
                }
              >
                {att.items.map((item, i2) => {
                  const styles = StyleSheet.create({
                    singleAtt: {
                      backgroundColor: item.displayValue,
                      borderColor:
                        this.props.pAttributes[i] === item.value
                          ? "#5ECE7B"
                          : item.displayValue === "White"
                          ? "black"
                          : item.displayValue,
                    },
                  });
                  if (this.props.small) {
                    return att.type === "swatch" ? (
                      <div key={i2}>
                        <div
                          className={
                            (this.props.pAttributes[i] === item.value
                              ? "cartSingleAttSelectedSwatchSmall "
                              : "cartSingleAttSmallSwatch ") +
                            css(styles.singleAtt)
                          }
                        ></div>
                      </div>
                    ) : (
                      <div key={i2}>
                        <div
                          className={
                            this.props.pAttributes[i] === item.value
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
                            (this.props.pAttributes[i] === item.value
                              ? "cartSingleAttSelectedSwatch "
                              : "cartSingleAttSwatch ") + css(styles.singleAtt)
                          }
                        ></div>
                      </div>
                    ) : (
                      <div key={i2}>
                        <div
                          className={
                            this.props.pAttributes[i] === item.value
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
    );
  }
}

export default CartInfo;
