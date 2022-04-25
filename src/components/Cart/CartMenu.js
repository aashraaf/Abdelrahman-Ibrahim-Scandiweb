import "../../css/NavBar.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

class CartMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
    };
    this.containerCart = React.createRef();
  }
  handleshowCart = () => {
    this.setState((state) => {
      return {
        showCart: !state.showCart,
      };
    });
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.containerCart.current &&
      !this.containerCart.current.contains(event.target)
    ) {
      this.setState({
        showCart: false,
      });
    }
  };
  render() {
    return (
      <div>
        <div className="cartMenu" ref={this.containerCart}>
          <img
            alt=""
            className="cartIcon"
            src={require("../../files/cartMenu.png")}
            onClick={() => this.handleshowCart()}
          />
          {this.props.cart.length !== 0 ? (
            <div className="cartCountSmallNav">{this.props.totalAmount}</div>
          ) : (
            <></>
          )}
          {this.state.showCart && (
            <div className="cartSmall">
              <div className="myBag">
                <h2 className="myBag1">My Bag, </h2>
                <h2 className="myBag2">
                  {" " + this.props.totalAmount + " items"}
                </h2>
              </div>
              <div className="scroll" id="miniCartScroll">
                {this.props.cart === null ? (
                  <div></div>
                ) : this.props.cart.length !== 0 ? (
                  this.props.cart.map((product, i) => {
                    return (
                      <div key={i} className="cartHolderMini">
                        {this.state.showCart && (
                          <CartItem
                            small={true}
                            addToCartAttributes={this.props.addToCartAttributes}
                            removeFromCart={this.props.removeFromCart}
                            key={i}
                            currency={this.props.currency}
                            product={product}
                          ></CartItem>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <h2 className="titleNAMini">Cart is Empty</h2>
                )}
              </div>
              <div className="priceFlex">
                <h2 className="total">Total</h2>
                <h2 className="tPrice">
                  {this.props.currency + "" + this.props.totalPrice}
                </h2>
              </div>
              {this.props.categories === null ? (
                <></>
              ) : (
                <div className="buttonFlex">
                  <Link className="link" to={{ pathname: "/cart" }}>
                    <h2
                      className="viewBag"
                      onClick={() => {
                        this.setState({ showCart: false });
                        window.scrollTo(0, 0);
                        localStorage.setItem("pAid", null);
                      }}
                    >
                      {" "}
                      View Bag
                    </h2>
                  </Link>
                  <Link
                    className="link"
                    onClick={() => {
                      this.props.changeCategory(this.props.categories[0].name);
                      window.scrollTo(0, 0);
                      localStorage.setItem("pAid", null);
                    }}
                    to={{ pathname: "/" + this.props.categories[0].name }}
                  >
                    <h2
                      className="checkOut"
                      onClick={() => {
                        this.setState({ showCart: false });
                        this.props.deleteCart();
                      }}
                    >
                      {" "}
                      Check Out
                    </h2>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        {this.state.showCart && <div className="opacity" />}
      </div>
    );
  }
}

export default CartMenu;
