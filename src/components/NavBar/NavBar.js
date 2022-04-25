import "../../css/NavBar.css";
import React, { Component } from "react";
import gqlFunctions from "../../files/gqlQueries";
import CurrencyIcon from "./CurrencyIcon";
import CartMenu from "../Cart/CartMenu";
import NavCategories from "./NavCategories";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: null,
      categories: null,
      showCurrency: false,
      showCart: false,
    };
  }

  componentDidMount() {
    gqlFunctions.getCategories().then((result) => {
      this.setState({ categories: result });
    });

    gqlFunctions.getCurrency().then((result) => {
      this.setState({ currencies: result });
    });
  }

  render() {
    return (
      <nav className="mainNav">
        <NavCategories
          categories={this.state.categories}
          changeCategory={this.props.changeCategory}
          category={this.props.category}
        />

        <div className="brandIcon">
          <img alt="" src={require("../../files/Brand icon.png")} />
        </div>

        <div className="rightNavFlex">
          <CurrencyIcon
            currency={this.props.currency}
            changeCurrency={this.props.changeCurrency}
            currencies={this.state.currencies}
          />

          <CartMenu
            cart={this.props.cart}
            totalAmount={this.props.totalAmount}
            totalPrice={this.props.totalPrice}
            addToCartAttributes={this.props.addToCartAttributes}
            removeFromCart={this.props.removeFromCart}
            currency={this.props.currency}
            changeCategory={this.props.changeCategory}
            deleteCart={this.props.deleteCart}
            categories={this.state.categories}
          />
        </div>
      </nav>
    );
  }
}

export default NavBar;
