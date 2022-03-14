import React, { Component } from "react";
import "./Navbar.scss";
import logo from "../../Images/logo_transparent.svg";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/queries";
import DropDown from "../DropDown/DropDown";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MiniCart from "../MiniCart/MiniCart";

export default class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav__inner">
          <Query query={GET_CATEGORIES}>
            {({ loading, error, data }) => {
              if (loading) return <h2>Loading...</h2>;
              if (error) console.log(`SOMETHIG WENT WRONG: ${error}`);

              return (
                <div className="nav__links">
                  {data.categories.map((cat) => {
                    return (
                      <Link
                        to={"/"}
                        onClick={() => {
                          this.props.changeCategory(cat.name);
                        }}
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
                if (error) console.log(`SOMETHIG WENT WRONG: ${error}`);

                return (
                  <div className="nav__action">
                    <DropDown
                      currencies={data}
                      changeCurrency={this.props.changeCurrency}
                      currCurrency={this.props.currCurrency}
                    />
                  </div>
                );
              }}
            </Query>

            <div className="nav__action">
              <MiniCart
                totalItemsInCart={this.props.totalItemsInCart}
                toggleMiniCart={this.props.toggleMiniCart}
                cart={this.props.cart}
                currCurrency={this.props.currCurrency}
                qtyIncrease={this.props.qtyIncrease}
                qtyDecrease={this.props.qtyDecrease}
                miniCartDisplay={this.props.miniCartDisplay}
                closeMiniCart={this.props.closeMiniCart}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  changeCategory: PropTypes.func,
  currCurrency: PropTypes.string,
  toggleMiniCart: PropTypes.func,
  changeCurrency: PropTypes.func,
  totalItemsInCart: PropTypes.number,
  cart: PropTypes.array,
  qtyIncrease: PropTypes.func,
  qtyDecrease: PropTypes.func,
  miniCartDisplay: PropTypes.bool,
  closeMiniCart: PropTypes.func,
};
