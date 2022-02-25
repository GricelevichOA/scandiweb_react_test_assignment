import React, { Component } from "react";

export default class CartItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="cart__item">
        {item.brand} {item.name} QUANITY: {item.qty}
      </div>
    );
  }
}
