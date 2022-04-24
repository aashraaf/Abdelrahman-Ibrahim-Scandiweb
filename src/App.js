import "./App.css";
import React, { Component } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import NavBar from "./components/NavBar";
import "./css/NavBar.css";
import {
  BrowserRouter,
  Route,
  useParams,
  Navigate,
  Routes,
} from "react-router-dom";
import isEqual from "lodash/isEqual";

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new ApolloClient({
      uri: "http://localhost:4000/",
      cache: new InMemoryCache(),
    });

    this.state = {
      category: null,
      categories: null,
      products: null,
      currency: "$",
      cart: [],
      totalPrice: 0,
      totalAmount: 0,
    };
    this.changeCategory = this.changeCategory.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.addToCartDefault = this.addToCartDefault.bind(this);
    this.addToCartAttributes = this.addToCartAttributes.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
  }
  componentDidMount() {
    let q = `{
        categories {
          name
        }
      } 
      `;
    this.client
      .query({
        query: gql(q),
      })
      .then((result) => {
        this.setState({
          categories: result.data.categories,
          category: result.data.categories[0].name,
        });
        this.getProducts(result.data.categories[0].name);
      });

    if (localStorage.getItem("cart") !== null) {
      const totalPrice = parseFloat(localStorage.getItem("totalPrice"));
      const totalAmount = parseInt(localStorage.getItem("totalAmount"));
      const currency = localStorage.getItem("currency");
      const cart = JSON.parse(localStorage.getItem("cart"));
      this.setState({
        totalAmount: totalAmount,
        totalPrice: totalPrice,
        currency: currency,
        cart: cart,
      });
    }
  }

  addToCartDefault(product) {
    const defaultAtt = [];
    product.attributes.map((att) => {
      defaultAtt.push(att.items[0].value);
      return true;
    });
    const p = Object.assign(
      { amount: 1, selectedAttributes: defaultAtt },
      product
    );

    var index = -1;
    this.state.cart.forEach((element, i) => {
      if (
        isEqual(p.id, element.id) &&
        isEqual(p.selectedAttributes, element.selectedAttributes)
      ) {
        index = i;
      }
    });
    if (index !== -1) {
      const joined = this.state.cart;
      joined[index].amount = joined[index].amount + 1;
      this.setState({ cart: [] });
      this.setState({ cart: joined });
      this.calculateTotalPrice(joined, this.state.currency);
    } else {
      const joined = this.state.cart.concat(p);
      this.setState({ cart: joined });
      this.calculateTotalPrice(joined, this.state.currency);
    }
  }

  calculateTotalPrice(j, c) {
    var t = 0;
    var a = 0;
    j.map((p) => {
      p.prices
        .filter((price) => price.currency.symbol === c)
        .map((filteredPrice, i) => {
          t = t + filteredPrice.amount * p.amount;
          a = a + p.amount;
          return true;
        });
      return true;
    });
    this.setState({ totalPrice: t.toFixed(2), totalAmount: a });
    localStorage.setItem("totalPrice", t.toFixed(2));
    localStorage.setItem("totalAmount", a);
    localStorage.setItem("cart", JSON.stringify(j));
    localStorage.setItem("currency", c);
  }

  addToCartAttributes(product, att) {
    var index = -1;
    this.state.cart.forEach((element, i) => {
      if (
        isEqual(product.id, element.id) &&
        isEqual(att, element.selectedAttributes)
      ) {
        index = i;
      }
    });
    if (index === -1) {
      const p = Object.assign({ amount: 1, selectedAttributes: att }, product);
      const joined = this.state.cart.concat(p);
      this.setState({ cart: joined });
      this.calculateTotalPrice(joined, this.state.currency);
    } else {
      const joined = this.state.cart;
      joined[index].amount = joined[index].amount + 1;
      this.setState({ cart: joined });
      this.calculateTotalPrice(joined, this.state.currency);
    }
  }

  removeFromCart(product, willDelete) {
    if (willDelete) {
      const newCart = this.state.cart.filter(
        (p) =>
          p.id !== product.id ||
          p.selectedAttributes !== product.selectedAttributes
      );
      this.setState({ cart: newCart });
      this.calculateTotalPrice(newCart, this.state.currency);
    } else {
      const i = this.state.cart.indexOf(product);
      if (i !== -1) {
        const joined = this.state.cart;
        joined[i].amount = joined[i].amount - 1;
        this.setState({ cart: joined });
        this.calculateTotalPrice(joined, this.state.currency);
      }
    }
  }

  deleteCart() {
    this.setState({ cart: [], totalPrice: 0, totalAmount: 0 });
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("totalPrice", 0.0);
    localStorage.setItem("totalAmount", 0);
  }

  changeCategory(cat) {
    if (this.state.category !== cat) {
      this.setState({ category: cat });
      this.getProducts(cat);
    }
  }

  changeCurrency(cur) {
    if (this.state.currency !== cur) {
      this.setState({ currency: cur });
      this.calculateTotalPrice(this.state.cart, cur);
    }
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
            attributes {
              id
              name
              type
              items {
                id
                displayValue
                value
              }
            }
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
    await this.client
      .query({
        query: gql(q),
      })
      .then((result) => {
        this.setState({ products: result.data.category.products });
      });
  }

  render() {
    const MainPageWrapper = (props) => {
      const params = useParams();
      return (
        <MainPage
          client={this.client}
          addToCartDefault={this.addToCartDefault}
          currency={this.state.currency}
          category={this.state.category}
          products={this.state.products}
          setSingleProduct={this.setSingleProduct}
          categories={this.state.categories}
          {...{ ...props, match: { params } }}
        />
      );
    };

    const ProductPageWrapper = (props) => {
      const params = useParams();
      return (
        <ProductPage
          category={this.state.category}
          client={this.client}
          id={this.state.singleProductid}
          addToCartAttributes={this.addToCartAttributes}
          currency={this.state.currency}
          changeCategory={this.changeCategory}
          {...{ ...props, match: { params } }}
        />
      );
    };

    const CartPageWrapper = (props) => {
      const params = useParams();
      return (
        <CartPage
          category={this.state.category}
          totalAmount={this.state.totalAmount}
          totalPrice={this.state.totalPrice}
          categories={this.state.categories}
          changeCategory={this.changeCategory}
          deleteCart={this.deleteCart}
          client={this.client}
          addToCartAttributes={this.addToCartAttributes}
          removeFromCart={this.removeFromCart}
          currency={this.state.currency}
          cartProducts={this.state.cart}
          {...{ ...props, match: { params } }}
        />
      );
    };

    if (this.state.products !== null && this.state.categories !== null) {
      return (
        <div>
          <BrowserRouter>
            <NavBar
              client={this.client}
              totalAmount={this.state.totalAmount}
              totalPrice={this.state.totalPrice}
              addToCartAttributes={this.addToCartAttributes}
              removeFromCart={this.removeFromCart}
              cart={this.state.cart}
              currency={this.state.currency}
              changeCurrency={this.changeCurrency}
              category={this.state.category}
              changeCategory={this.changeCategory}
              deleteCart={this.deleteCart}
            ></NavBar>
            <Routes>
              <Route path="/product/:id" element={<ProductPageWrapper />} />
              <Route path="/:category" element={<MainPageWrapper />} />
              <Route path="/cart" element={<CartPageWrapper />} />
              <Route
                path="*"
                element={
                  <Navigate to={"/" + this.state.categories[0].name} replace />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default App;
