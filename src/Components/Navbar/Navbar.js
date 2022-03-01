import React, { Component } from "react";
import "./Navbar.scss";
import logo from "../../Images/logo_transparent.svg";
import cartLogo from "../../Images/empty_cart.svg";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/queries";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav__inner">
          <Query query={GET_CATEGORIES}>
            {({ loading, error, data }) => {
              if (loading) return <h2>Loading...</h2>;
              return (
                <div className="nav__links">
                  {data.categories.map((cat) => {
                    return (
                      <Link
                        to={`/${cat.name}`}
                        className="nav__link"
                        key={cat.name}
                      >
                        {cat.name}
                      </Link>
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

                return (
                  <select
                    className="nav__action"
                    onChange={(e) => {
                      this.props.changeCurrency(e.target.value);
                    }}
                  >
                    {data.currencies.map((cur) => {
                      return (
                        <option key={cur.label} value={cur.label}>
                          {cur.symbol} {cur.label}
                        </option>
                      );
                    })}
                  </select>
                );
              }}
            </Query>

            <div className="nav__action">
              <div
                onClick={() => {
                  this.props.toggleMiniCart();
                }}
              >
                <img src={cartLogo} alt="Cart" />
                {this.props.totalItemsInCart}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
