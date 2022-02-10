import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../Images/logo_transparent.svg";
import cartLogo from "../../Images/empty_cart.svg";

export default class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav__links">
          {this.props.categories.map((cat) => {
            return (
              <span className="nav__link" key={cat.name}>
                {cat.name}
              </span>
            );
          })}
        </div>
        <div className="nav__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="nav__actions">
          <select className="nav__action">
            {this.props.currencies.map((cur) => {
              return (
                <option key={cur.label}>
                  {cur.symbol} {cur.label}
                </option>
              );
            })}
          </select>
          <div className="nav__action">
            <img src={cartLogo} alt="Cart" />
          </div>
        </div>
      </div>
    );
  }
}
