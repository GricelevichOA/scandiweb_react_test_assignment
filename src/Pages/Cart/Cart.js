import React, { Component } from "react";
import CartItem from "../../Components/CartItem/CartItem";

export default class Cart extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div className="cart">
        <h1>Cart</h1>
        <div className="cart__list">
          {cart.map((item) => {
            return (
              <CartItem
                key={item.key}
                item={item}
                onAddToCart={this.props.onAddToCart}
                onRemoveFromCart={this.props.onRemoveFromCart}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
