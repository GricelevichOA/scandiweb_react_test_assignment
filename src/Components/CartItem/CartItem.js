import React, { Component } from "react";

export default class CartItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="cart__item">
        {item.brand} {item.name} QUANITY:
        <button
          onClick={() => {
            this.props.onAddToCart(item);
          }}
        >
          +
        </button>
        {item.qty}
        <button
          onClick={() => {
            this.props.onRemoveFromCart(item);
          }}
        >
          -
        </button>
      </div>
    );
  }
}
