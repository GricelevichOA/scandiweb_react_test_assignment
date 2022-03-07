import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniCartItem from "../MiniCartItem/MiniCartItem";
import "./MiniCart.scss";

export default class MiniCart extends Component {
  render() {
    const { cart } = this.props;
    return (
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
              <div className="minicart__total-price">$100</div>
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
    );
  }
}
