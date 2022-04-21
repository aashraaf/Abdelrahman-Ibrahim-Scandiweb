import "../css/CartPage.css";
import React, { Component } from "react";
import CartItem from "./CartItem";

class CartPage extends Component {
  

  render() {
    return (
      <div className="mainCart">
        <h2 className="cartTitle">Cart</h2>
        <div className="cartHolder  ">
          {this.props.cartProducts === null ? (
            <div></div>
          ) : (
            this.props.cartProducts.map((product, i) => {
              return (
                <CartItem
                  small={false}
                  addToCartAttributes={this.props.addToCartAttributes}
                  removeFromCart={this.props.removeFromCart}
                  key={i}
                  currency={this.props.currency}
                  product={product}
                ></CartItem>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default CartPage;
