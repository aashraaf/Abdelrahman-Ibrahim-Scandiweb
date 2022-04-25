import "../../css/ProductPage.css";
import React, { Component } from "react";
import gqlFunctions from "../../files/gqlQueries";
import ProductSmallImg from "./ProductSmallImg";
import ProductInfo from "./ProductInfo";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      image: null,
      pAttributes: [],
      valid: false,
      loading: false,
    };
    this._isMounted = false;
    this.changeImage = this.changeImage.bind(this);
    this.changeAtt = this.changeAtt.bind(this);
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
    gqlFunctions.getProduct(id).then((result) => {
      if (result !== null) {
        result.attributes.map((att) => {
          const joined = this.state.pAttributes.concat(att.items[0].value);
          if (this._isMounted) {
            this.setState({ pAttributes: joined });
          }
          return true;
        });
        if (this._isMounted) {
          this.setState({
            product: result,
            image: result.gallery[0],
            valid: true,
          });
        }
      }
      this.setState({ loading: true });
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
    if (this.state.loading) {
      return (
        <div className="mainProduct">
          {!this.state.valid ? (
            <h2 className="titleNA">Product Not Available</h2>
          ) : (
            <div className="productHolder">
              <ProductSmallImg
                image={this.state.image}
                product={this.state.product}
                changeImage={this.changeImage}
              />

              <div className="bigImg">
                <img alt="" className="bigCardImg" src={this.state.image}></img>
              </div>

              <ProductInfo
                currency={this.props.currency}
                addToCartAttributes={this.props.addToCartAttributes}
                product={this.state.product}
                pAttributes={this.state.pAttributes}
                changeAtt={this.changeAtt}
              />
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="main">
          <></>
        </div>
      );
    }
  }
}

export default ProductPage;
