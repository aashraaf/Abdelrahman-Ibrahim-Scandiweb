import "../../css/CartPage.css";
import React, { Component } from "react";
import CartInfo from "./CartInfo";
import CartOptions from "./CartOptions";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pAttributes: this.props.product.selectedAttributes,
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
        {!this.props.small && <hr className="horizontalLine"></hr>}
        <div className="cartItem ">
          <CartInfo
            product={this.props.product}
            small={this.props.small}
            currency={this.props.currency}
            pAttributes={this.state.pAttributes}
          />
          <CartOptions
            small={this.props.small}
            addToCartAttributes={this.props.addToCartAttributes}
            product={this.props.product}
            removeFromCart={this.props.removeFromCart}
          />
        </div>
      </>
    );
  }
}

export default CartItem;
