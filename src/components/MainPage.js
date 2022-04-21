import "../css/MainPage.css";
import React, { Component } from "react";
import Card from "./Card";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.match.params.category,
      products: this.props.products,
      valid: false,
    };
  }

  componentDidMount() {
    this.props.categories.map((c) => {
      if (c.name === this.state.category) this.setState({ valid: true });
      return true;
    });
  }

  render() {
    if (this.state.valid) {
      return (
        <div className="main">
          <h2 className="title">{this.state.category}</h2> <br></br>
          <div className="cardHolder">
            {this.state.products === null ? (
              <div></div>
            ) : (
              this.state.products.map((product, i) => {
                return (
                  <Card
                    addToCartDefault={this.props.addToCartDefault}
                    currency={this.props.currency}
                    setSingleProduct={this.props.setSingleProduct}
                    key={product.id}
                    p={product}
                  ></Card>
                );
              })
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="main">
          <h2 className="titleNA">Category Not Available</h2> <br></br>
        </div>
      );
    }
  }
}

export default MainPage;
