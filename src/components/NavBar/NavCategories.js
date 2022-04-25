import "../../css/NavBar.css";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavCategories extends Component {
  render() {
    return (
      <div className="navFlex">
        {this.props.categories === null ? (
          <div></div>
        ) : (
          this.props.categories.map((cat, i) => {
            return (
              <NavLink
                onClick={() => {
                  this.props.changeCategory(cat.name);
                  window.scrollTo(0, 0);
                  localStorage.setItem("pAid", null);
                }}
                className={({ isActive }) =>
                  cat.name === this.props.category
                    ? "categoryOn"
                    : "categoryOff"
                }
                key={cat.name}
                to={"/" + cat.name}
              >
                <h3 key={cat.name}>{cat.name}</h3>
              </NavLink>
            );
          })
        )}
      </div>
    );
  }
}

export default NavCategories;
