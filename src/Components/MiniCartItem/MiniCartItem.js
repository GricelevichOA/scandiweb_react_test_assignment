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
            {item.selectedAttributes.map((a) => {
              return (
                <div key={a.id}>
                  <div className="minicart-item__attributes-name">{a.name}</div>
                  {a.type === "swatch" ? (
                    <button
                      className="minicart-item__attribute"
                      style={{
                        backgroundColor: a.item.value,
                        color: a.item.value,
                      }}
                    >
                      {a.item.displayValue}
                    </button>
                  ) : (
                    <button className="minicart-item__attribute">
                      {a.item.value}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="minicart-item__actions">
          <button
            className="minicart-item__action"
            onClick={() => {
              this.props.qtyIncrease(item);
            }}
          >
            +
          </button>
          <div className="minicart-item__counter">{item.qty}</div>
          <button
            className="minicart-item__action"
            onClick={() => {
              this.props.qtyDecrease(item);
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
