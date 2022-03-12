import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
          <div className="minicart-item__brand">
            <Link to={`/product/${item.id}`}>{item.brand}</Link>
          </div>
          <div className="minicart-item__name">
            <Link to={`/product/${item.id}`}>{item.name}</Link>
          </div>
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
          <img src={item.gallery[0]} alt={item.name} />
        </div>
      </div>
    );
  }
}

MiniCartItem.propTypes = {
  currCurrency: PropTypes.string,
  item: PropTypes.object,
  qtyIncrease: PropTypes.func,
  qtyDecrease: PropTypes.func,
};
