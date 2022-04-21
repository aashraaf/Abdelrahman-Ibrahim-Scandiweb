import "../css/MainPage.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  render() {
    return (
      <div className={this.props.p.inStock ? "cardIn" : "cardSold"}>
        {this.props.p.inStock ? (
          <Link
            to={{ pathname: "/product/" + this.props.p.id }}
            style={{ textDecoration: "none" }}
          >
            <div>
              <img
                alt=""
                className="cardImg"
                src={this.props.p.gallery[0]}
              ></img>
              <h4 className="cardName">
                {this.props.p.brand + " " + this.props.p.name}
              </h4>
              {this.props.p.prices
                .filter(
                  (price) => price.currency.symbol === this.props.currency
                )
                .map((filteredPrice, i) => (
                  <h4 key={i} className="cardPrice">
                    {filteredPrice.currency.symbol + "" + filteredPrice.amount}
                  </h4>
                ))}
            </div>
          </Link>
        ) : (
          <div id="">
            <img alt="" className="cardImg" src={this.props.p.gallery[0]}></img>
            <h4 className="cardName">
              {this.props.p.brand + " " + this.props.p.name}
            </h4>
            {this.props.p.prices
              .filter((price) => price.currency.symbol === this.props.currency)
              .map((filteredPrice, i) => (
                <h4 key={i} className="cardPrice">
                  {filteredPrice.currency.symbol + "" + filteredPrice.amount}
                </h4>
              ))}
          </div>
        )}

        <div
          className="cardCartBtn"
          id={this.props.p.id}
          onClick={() => this.props.addToCartDefault(this.props.p)}
        >
          <img alt="" src={require("../files/cart.png")} />
        </div>
        <div className={this.props.p.inStock ? "inStock" : "outStock"}>
          OUT OF STOCK
        </div>
      </div>
    );
  }
}

export default Card;
