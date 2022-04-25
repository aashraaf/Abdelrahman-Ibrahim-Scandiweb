import "../../css/CartPage.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class CartFooter extends Component {
  render() {
    return (
      <>
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
          <div className="cartFlexCPrice">
            <h2 className="taxPrice"> Total: </h2>
            <h2 className="taxB">
              {this.props.currency}
              {this.props.totalPrice}
            </h2>
          </div>
          <Link
            className="link"
            onClick={() => {
              this.props.changeCategory(this.props.categories[0].name);
              window.scrollTo(0, 0);
            }}
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
      </>
    );
  }
}

export default CartFooter;
