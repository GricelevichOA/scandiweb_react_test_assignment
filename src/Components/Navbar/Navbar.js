import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../Images/logo_transparent.svg";
import cartLogo from "../../Images/empty_cart.svg";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/queries";

export default class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <h2>Loading...</h2>;
            console.log(data);
            return (
              <div className="nav__links">
                {data.categories.map((cat) => {
                  return (
                    <span className="nav__link" key={cat.name}>
                      {cat.name}
                    </span>
                  );
                })}
              </div>
            );
          }}
        </Query>
        <div className="nav__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="nav__actions">
          <Query query={GET_CURRENCIES}>
            {({ loading, error, data }) => {
              if (loading) return <h3>Loading...</h3>;
              console.log(data);
              return (
                <select className="nav__action">
                  {data.currencies.map((cur) => {
                    return (
                      <option key={cur.label}>
                        {cur.symbol} {cur.label}
                      </option>
                    );
                  })}
                </select>
              );
            }}
          </Query>

          <div className="nav__action">
            <img src={cartLogo} alt="Cart" />
          </div>
        </div>
      </div>
    );
  }
}
