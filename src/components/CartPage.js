import "../css/CartPage.css";
import React, { Component } from "react";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

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
          <hr className="horizontalLine"></hr>
          <div className="cartFlex">
            <div className="cartFlexC">
              <h2 className="tax">Tax:</h2>
              <h2 className="taxB">
                {this.props.currency}
                {(parseFloat(this.props.totalPrice) * 0.075).toFixed(2)}
              </h2>
            </div>
            <div className="cartFlexC">
              <h2 className="tax">Qty:</h2>
              <h2 className="taxB">{this.props.totalAmount}</h2>
            </div>
            <div className="cartFlexC" style={{ paddingTop: "15px" }}>
              <h2 className="tax" style={{ fontWeight: 500 }}>
                {" "}
                Total:{" "}
              </h2>
              <h2 className="taxB">
                {this.props.currency}
                {this.props.totalPrice}
              </h2>
            </div>
            <Link
              onClick={() => {
                this.props.changeCategory(this.props.categories[0].name);
              }}
              style={{ textDecoration: "none" }}
              to={{ pathname: "/" + this.props.categories[0].name }}
            >
              <h2
                className="order"
                onClick={() => {
                  this.props.deleteCart();
                }}
              >
                Order
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
