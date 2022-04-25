import "../../css/CartPage.css";
import React, { Component } from "react";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";

class CartPage extends Component {
  render() {
    return (
      <div className="mainCart">
        <h2 className="cartTitle">Cart</h2>
        <div className="cartHolder  ">
          {this.props.cartProducts === null ? (
            <div></div>
          ) : this.props.cartProducts.length !== 0 ? (
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
          ) : (
            <h2 className="titleNA">Cart is Empty</h2>
          )}

          <CartFooter
            currency={this.props.currency}
            totalPrice={this.props.totalPrice}
            totalAmount={this.props.totalAmount}
            categories={this.props.categories}
            changeCategory={this.props.changeCategory}
            deleteCart={this.props.deleteCart}
          />
        </div>
      </div>
    );
  }
}

export default CartPage;
