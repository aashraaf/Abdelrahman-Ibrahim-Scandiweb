import "../../css/NavBar.css";
import React, { Component } from "react";

class CurrencyIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrency: false,
    };
    this.containerCurrency = React.createRef();
  }
  handleshowCurrency = () => {
    this.setState((state) => {
      return {
        showCurrency: !state.showCurrency,
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
      this.containerCurrency.current &&
      !this.containerCurrency.current.contains(event.target)
    ) {
      this.setState({
        showCurrency: false,
      });
    }
  };
  render() {
    return (
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
              src={require("../../files/cUp.png")}
            />
          ) : (
            <img
              alt=""
              className="currencyIconArrow"
              src={require("../../files/cDown.png")}
            />
          )}
        </div>
        {this.state.showCurrency ? (
          <div className="currencyMenu">
            {this.props.currencies.map((c, i) => {
              return (
                <div
                  key={i}
                  className="currencyItemsHolder"
                  onClick={() => {
                    this.props.changeCurrency(c.symbol);
                    this.setState({ showCurrency: false });
                  }}
                >
                  <h2 className="currencyItems">
                    {c.symbol} {c.label}
                  </h2>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default CurrencyIcon;
