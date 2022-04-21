import "../css/ProductPage.css";
import React, { Component } from "react";
import { gql } from "@apollo/client";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null, image: null, pAttributes: [], valid: false };
    this._isMounted = false;
  }

  changeImage(img) {
    this.setState({ image: img });
  }

  changeAtt(v, i) {
    const joined = this.state.pAttributes;
    joined[i] = v;

    this.setState({ pAttributes: joined });
  }

  async getProduct(id) {
    let q =
      `{
      product(id: "` +
      id +
      `") {
        id
        name
        brand
        gallery
        inStock
        description
        category
        prices {
          currency {
            symbol
            label
          }
          amount
        }
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
      }
    }
    `;
    this.props.client
      .query({
        query: gql(q),
      })
      .then((result) => {
        if (result.data.product !== null) {
          result.data.product.attributes.map((att) => {
            const joined = this.state.pAttributes.concat(att.items[0].value);
            if (this._isMounted) {
              this.setState({ pAttributes: joined });
            }
            return true;
          });
          if (this._isMounted) {
            this.setState({
              product: result.data.product,
              image: result.data.product.gallery[0],
            });
          }
          this.setState({ valid: true });
        }
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.getProduct(this.props.match.params.id);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.valid) {
      return (
        <div className="mainProduct">
          {this.state.product === null ? (
            <div></div>
          ) : (
            <div className="productHolder">
              <div className="smallImgs">
                {this.state.product.gallery.map((image, i) => {
                  return this.state.image === image ? (
                    <img
                      alt=""
                      key={i}
                      className="smallCardImgSelected"
                      src={image}
                    ></img>
                  ) : (
                    <img
                      alt=""
                      key={i}
                      className="smallCardImg"
                      src={image}
                      onClick={() => this.changeImage(image)}
                    ></img>
                  );
                })}
              </div>
              <div className="bigImg">
                <img alt="" className="bigCardImg" src={this.state.image}></img>
              </div>

              <div className="productInfo">
                <h2 className="brand">{this.state.product.brand}</h2>
                <h2 className="speceficProduct">{this.state.product.name}</h2>

                {this.state.product.attributes.map((att, i) => {
                  return (
                    <div key={i} style={{ paddingLeft: "60px", width: 350 }}>
                      <h2 className="attText">{att.id}:</h2>
                      <div className="attributes">
                        {att.items.map((item, i2) => {
                          return att.type === "swatch" ? (
                            <div key={i2}>
                              <div
                                className={
                                  this.state.pAttributes[i] === item.value
                                    ? "singleAttSelectedSwatch"
                                    : "singleAttSwatch"
                                }
                                style={{ backgroundColor: item.displayValue }}
                                onClick={() => this.changeAtt(item.value, i)}
                              ></div>
                            </div>
                          ) : (
                            <div key={i2}>
                              {this.state.pAttributes[i] === item.value}
                              <div
                                className={
                                  this.state.pAttributes[i] === item.value
                                    ? "singleAttSelected"
                                    : "singleAtt"
                                }
                                onClick={() => this.changeAtt(item.value, i)}
                              >
                                {item.value}{" "}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <h2
                  className="priceText"
                  style={{ paddingLeft: "60px", width: 350 }}
                >
                  PRICE:
                </h2>
                {this.state.product.prices
                  .filter(
                    (price) => price.currency.symbol === this.props.currency
                  )
                  .map((filteredPrice, i) => (
                    <h2 key={i} className="price">
                      {filteredPrice.currency.symbol +
                        "" +
                        filteredPrice.amount}
                    </h2>
                  ))}

                <Link to="/" style={{ textDecoration: "none" }}>
                  <div
                    className="addCart"
                    onClick={() => {
                      this.props.changeCategory("all");
                      this.props.addToCartAttributes(
                        this.state.product,
                        this.state.pAttributes
                      );
                    }}
                  >
                    Add to cart
                  </div>
                </Link>

                <div className="discription">
                  {parse(this.state.product.description)}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="main">
          <h2 className="titleNA">Product Not Available</h2> <br></br>
        </div>
      );
    }
  }
}

export default ProductPage;
