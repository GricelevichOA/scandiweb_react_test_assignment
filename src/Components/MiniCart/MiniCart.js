import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MiniCartItem from "../MiniCartItem/MiniCartItem";
import "./MiniCart.scss";
import cartLogo from "../../Images/empty_cart.svg";

export default class MiniCart extends Component {
  constructor(props) {
    super(props);

    this.box = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    if (this.box && !this.box.current.contains(e.target)) {
      this.props.closeMiniCart();
    }
  };

  render() {
    const { cart } = this.props;

    let totalPrice = 0;
    let currencySymbol = "";

    if (cart.length > 0) {
      totalPrice = this.props.cart
        .reduce((a, item) => {
          return (
            a +
            item.qty *
              item.prices.find(
                (pr) => pr.currency.label === this.props.currCurrency
              ).amount
          );
        }, 0)
        .toFixed(2);

      currencySymbol = this.props.cart[0].prices.find(
        (pr) => pr.currency.label === this.props.currCurrency
      ).currency.symbol;
    }

    return (
      <div className="mc" ref={this.box}>
        <div
          className="nav__cart"
          onClick={() => {
            this.props.toggleMiniCart();
          }}
        >
          <img src={cartLogo} alt="Cart" />
          {this.props.totalItemsInCart > 0 ? (
            <div className="nav__counter">{this.props.totalItemsInCart}</div>
          ) : null}
        </div>
        {this.props.miniCartDisplay ? (
          <div className="minicart">
            <div className="minicart__container">
              <div className="minicart__window">
                <div className="minicart__header">
                  <span className="minicart__bold">My Bag</span>,{" "}
                  <span className="minicart__text">
                    {this.props.totalItemsInCart} items
                  </span>
                </div>
                {cart.map((item) => {
                  return (
                    <MiniCartItem
                      currCurrency={this.props.currCurrency}
                      item={item}
                      key={item.key}
                      qtyIncrease={this.props.qtyIncrease}
                      qtyDecrease={this.props.qtyDecrease}
                    />
                  );
                })}
                <div className="minicart__total">
                  <div className="minicart__total-text">Total:</div>
                  <div className="minicart__total-price">
                    {currencySymbol}
                    {totalPrice}
                  </div>
                </div>

                <div className="minicart__buttons">
                  <Link
                    to={"/cart"}
                    className="minicart__tocart"
                    onClick={() => {
                      this.props.toggleMiniCart();
                    }}
                  >
                    VIEW BAG
                  </Link>
                  <button
                    className="minicart__checkout"
                    onClick={() => {
                      alert("Your items will arrive someday!");
                    }}
                  >
                    CHECK OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

MiniCart.propTypes = {
  length: PropTypes.number,
  cart: PropTypes.array,
  currCurrency: PropTypes.string,
  totalItemsInCart: PropTypes.number,
  qtyIncrease: PropTypes.func,
  qtyDecrease: PropTypes.func,
  toggleMiniCart: PropTypes.func,
  miniCartDisplay: PropTypes.bool,
  closeMiniCart: PropTypes.func,
};
