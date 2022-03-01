import React, { Component } from "react";
import "./CartItem.scss";

export default class CartItem extends Component {
  render() {
    const { item } = this.props;

    const price = item.prices.find(
      (pr) => pr.currency.label === this.props.currCurrency
    );

    return (
      <div className="cart-item">
        <div className="cart-item__info">
          <div className="cart-item__brand">{item.brand}</div>
          <div className="cart-item__name">{item.name}</div>
          <div className="cart-item__price">
            {price.currency.symbol} {price.amount}
          </div>
          <div className="cart-item__options">
            <button className="option-active">S</button>
            <button>M</button>
          </div>
        </div>

        <div className="cart-item__count">
          <button
            onClick={() => {
              this.props.onAddToCart(item);
            }}
          >
            +
          </button>
          <div className="cart-item__counter">{item.qty}</div>
          <button
            onClick={() => {
              this.props.onRemoveFromCart(item);
            }}
          >
            -
          </button>
        </div>
        <div className="cart-item__gallery">
          <img src={item.image} alt={item.name} />
        </div>
      </div>
    );
  }
}
