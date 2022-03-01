import React, { Component } from "react";
import "./MiniCartItem.scss";

export default class MiniCartItem extends Component {
  render() {
    const { item } = this.props;

    const price = item.prices.find(
      (pr) => pr.currency.label === this.props.currCurrency
    );

    return (
      <div className="minicart-item">
        <div className="minicart-item__info">
          <div className="minicart-item__brand">{item.brand}</div>
          <div className="minicart-item__name">{item.name}</div>
          <div className="minicart-item__price">
            {price.currency.symbol} {price.amount}
          </div>
          <div className="minicart-item__attributes">
            <button className="minicart-item__attribute">S</button>
            <button className="minicart-item__attribute attr-inactive">
              M
            </button>
          </div>
        </div>
        <div className="minicart-item__actions">
          <button
            className="minicart-item__action"
            onClick={() => {
              this.props.onAddToCart(item);
            }}
          >
            +
          </button>
          <div className="minicart-item__counter">{item.qty}</div>
          <button
            className="minicart-item__action"
            onClick={() => {
              this.props.onRemoveFromCart(item);
            }}
          >
            -
          </button>
        </div>
        <div className="minicart-item__picture">
          <img src={item.image} alt={item.name} />
        </div>
      </div>
    );
  }
}
