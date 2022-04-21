import "../css/NavBar.css";
import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Link, NavLink } from "react-router-dom";
import CartItem from "./CartItem";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: null,
      categories: null,
      showCurrency: false,
      showCart: false,
    };

    this.containerCurrency = React.createRef();
    this.containerCart = React.createRef();
  }

  handleshowCurrency = () => {
    this.setState((state) => {
      return {
        showCurrency: !state.showCurrency,
      };
    });
  };

  handleshowCart = () => {
    this.setState((state) => {
      return {
        showCart: !state.showCart,
      };
    });
  };

  changeCategory(cat) {
    this.setState({ category: cat });
    this.getProducts(cat);
  }

  async getProducts(cat) {
    let q =
      `{
        category(input:{title:"` +
      cat +
      `"}){
          products{
            id
            name
            brand
            gallery
            inStock
            prices{
              currency{
                symbol
                label
              }
              amount
            }
          }
        }
      }`;
    this.props.client
      .query({
        query: gql(q),
      })
      .then((result) => {
        this.setState({ products: result.data.category.products });
      });
  }

  async getCategories() {
    let q = `{
      categories {
        name
      }
    } 
    `;
    this.props.client
      .query({
        query: gql(q),
      })
      .then((result) => {
        this.setState({ categories: result.data.categories });
      });
  }

  async getCurrency() {
    let q = `{
      currencies {
        label
        symbol
      }
    } 
    `;

    this.props.client
      .query({
        query: gql(q),
      })
      .then((result) => {
        this.setState({ currencies: result.data.currencies });
      });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  componentDidMount() {
    this.getCategories();
    this.getCurrency();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.containerCurrency.current &&
      !this.containerCurrency.current.contains(event.target)
    ) {
      this.setState({
        showCurrency: false,
      });
    }

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
      <nav className="mainNav">
        <div className="navFlex">
          {this.state.categories === null ? (
            <div></div>
          ) : (
            this.state.categories.map((cat, i) => {
              return (
                <NavLink
                  onClick={() => this.props.changeCategory(cat.name)}
                  className={({ isActive }) =>
                    isActive ? "categoryOn" : "categoryOff"
                  }
                  style={{ textDecoration: "none" }}
                  key={cat.name}
                  to={"/" + cat.name}
                >
                  <h3 key={cat.name}>{cat.name}</h3>
                </NavLink>
              );
            })
          )}
        </div>
        <div className="brandIcon">
          <img alt="" src={require("../files/Brand icon.png")} />
        </div>
        <div
          className="navFlex"
          style={{ marginLeft: "150px", marginRight: "20px" }}
        >
          {this.state.currencies === null ? (
            <div></div>
          ) : (
            <div className="currencyIcon" ref={this.containerCurrency}>
              <div
                className="currencyBtn"
                onClick={() => {
                  this.handleshowCurrency();
                }}
              >
                {this.props.currency}
                {this.state.showCurrency ? (
                  <img
                    alt=""
                    className="currencyIconArrow"
                    src={require("../files/cUp.png")}
                  />
                ) : (
                  <img
                    alt=""
                    className="currencyIconArrow"
                    src={require("../files/cDown.png")}
                  />
                )}
              </div>
              {this.state.showCurrency ? (
                <div className="currencyMenu">
                  {this.state.currencies.map((c, i) => {
                    return (
                      <h2
                        key={i}
                        className="currencyItems"
                        onClick={() => {
                          this.props.changeCurrency(c.symbol);
                          this.setState({ showCurrency: false });
                        }}
                      >
                        {c.symbol} {c.label}
                      </h2>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
          <div className="cartMenu" ref={this.containerCart}>
            <img
              alt=""
              className="cartIcon"
              src={require("../files/cartMenu.png")}
              onClick={() => this.handleshowCart()}
            />
            {this.props.cart.length !== 0 ? (
              <div className="cartCountSmall">{this.props.totalAmount}</div>
            ) : (
              <></>
            )}
            <div
              className="cartSmall"
              style={this.state.showCart ? {} : { visibility: "hidden" }}
            >
              <div className="myBag">
                <h2 className="myBag1">My Bag, </h2>
                <h2 className="myBag2">
                  {" " + this.props.totalAmount + " items"}
                </h2>
              </div>
              <div className="scroll">
                {this.props.cart === null ? (
                  <div></div>
                ) : (
                  this.props.cart.map((product, i) => {
                    return (
                      <div
                        key={i}
                        className="cartHolder"
                        style={{
                          minHeight: "fit-content",
                          maxWidth: "325px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                        }}
                      >
                        <CartItem
                          style={
                            this.state.showCart ? {} : { visibility: "hidden" }
                          }
                          small={true}
                          addToCartAttributes={this.props.addToCartAttributes}
                          removeFromCart={this.props.removeFromCart}
                          key={i}
                          currency={this.props.currency}
                          product={product}
                        ></CartItem>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="priceFlex">
                <h2 className="total">Total</h2>
                <h2 className="tPrice">
                  {this.props.currency + "" + this.props.totalPrice}
                </h2>
              </div>
              {this.state.categories===null?<></>:
              <div className="buttonFlex">
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "/cart" }}
                >
                  <h2
                    className="viewBag"
                    onClick={() => this.setState({ showCart: false })}
                  >
                    {" "}
                    View Bag
                  </h2>
                </Link>
                <Link
                  onClick={() => {
                    this.props.changeCategory(this.state.categories[0].name);
                  }}
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "/"+this.state.categories[0].name }}
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
              }
            </div>
          </div>
        </div>
        {this.state.showCart && <div className="opacity" />}
      </nav>
    );
  }
}

export default NavBar;
