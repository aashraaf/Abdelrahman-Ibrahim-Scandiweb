import "../../css/ProductPage.css";
import React, { Component } from "react";
import parse from "html-react-parser";
import { StyleSheet, css } from "aphrodite";

class ProductInfo extends Component {
  render() {
    return (
      <div className="productInfo">
        <h2 className="brand">{this.props.product.brand}</h2>
        <h2 className="speceficProduct">{this.props.product.name}</h2>

        {this.props.product.attributes.map((att, i) => {
          return (
            <div className="attHolder" key={i}>
              <h2 className="attText">{att.id}:</h2>
              <div className="attributes">
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
                  return att.type === "swatch" ? (
                    <div key={i2}>
                      <div
                        className={
                          (this.props.pAttributes[i] === item.value
                            ? "singleAttSelectedSwatch "
                            : "singleAttSwatch ") + css(styles.singleAtt)
                        }
                        onClick={() => this.props.changeAtt(item.value, i)}
                      ></div>
                    </div>
                  ) : (
                    <div key={i2}>
                      {this.props.pAttributes[i] === item.value}
                      <div
                        className={
                          this.props.pAttributes[i] === item.value
                            ? "singleAttSelected"
                            : "singleAtt"
                        }
                        onClick={() => this.props.changeAtt(item.value, i)}
                      >
                        {item.value}{" "}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <h2 className="priceText">PRICE:</h2>
        {this.props.product.prices
          .filter((price) => price.currency.symbol === this.props.currency)
          .map((filteredPrice, i) => (
            <h2 key={i} className="price">
              {filteredPrice.currency.symbol + "" + filteredPrice.amount}
            </h2>
          ))}

        {this.props.product.inStock ? (
          <div
            className="addCart"
            onClick={() => {
              this.props.addToCartAttributes(
                this.props.product,
                this.props.pAttributes
              );
            }}
          >
            Add to cart
          </div>
        ) : (
          <div className="addCartOff">Out Of Stock</div>
        )}

        <div className="discription">
          {parse(this.props.product.description)}
        </div>
      </div>
    );
  }
}

export default ProductInfo;
