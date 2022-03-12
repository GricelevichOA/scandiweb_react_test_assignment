import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CartGallery from "../CartGallery/CartGallery";
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
          <div className="cart-item__brand">
            <Link to={`/product/${item.id}`}>{item.brand}</Link>
          </div>
          <div className="cart-item__name">
            <Link to={`/product/${item.id}`}>{item.name}</Link>
          </div>
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
          {/* <img src={item.gallery[0]} alt={item.name} /> */}
          <CartGallery gallery={item.gallery} />
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  item: PropTypes.object,
  qtyIncrease: PropTypes.func,
  qtyDecrease: PropTypes.func,
  currCurrency: PropTypes.string,
};
