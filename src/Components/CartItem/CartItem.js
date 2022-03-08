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
            {item.selectedAttributes.map((a) => {
              return (
                <div key={a.id}>
                  <div className="cart-item__attribute-name">{a.name}</div>
                  {a.type === "swatch" ? (
                    <button
                      style={{
                        backgroundColor: a.item.value,
                        color: a.item.value,
                      }}
                    >
                      {a.item.displayValue}
                    </button>
                  ) : (
                    <button>{a.item.value}</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="cart-item__count">
          <button
            onClick={() => {
              this.props.qtyIncrease(item);
            }}
          >
            +
          </button>
          <div className="cart-item__counter">{item.qty}</div>
          <button
            onClick={() => {
              this.props.qtyDecrease(item);
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
