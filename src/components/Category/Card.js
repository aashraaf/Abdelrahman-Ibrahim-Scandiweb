import "../../css/MainPage.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  render() {
    return (
      <div className={this.props.p.inStock ? "cardIn" : "cardSold"}>
        <Link
          className="link"
          to={{ pathname: "/product/" + this.props.p.id }}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <div>
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
        </Link>

        {this.props.p.inStock ? (
          <div
            className="cardCartBtn"
            id={this.props.p.id}
            onClick={() => this.props.addToCartDefault(this.props.p)}
          >
            <img alt="" src={require("../../files/cart.png")} />
          </div>
        ) : (
          <div className={this.props.p.inStock ? "inStock" : "outStock"}>
            OUT OF STOCK
          </div>
        )}
      </div>
    );
  }
}

export default Card;
