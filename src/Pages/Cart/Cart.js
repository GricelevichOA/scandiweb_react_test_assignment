import React, { Component } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import "./Cart.scss";

export default class Cart extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div className="cart">
        <div className="cart__header">CART</div>
        <div className="cart__list">
          {cart.length === 0 ? (
            <h2>Your Cart is empty</h2>
          ) : (
            cart.map((item) => {
              return (
                <CartItem
                  key={item.key}
                  item={item}
                  currCurrency={this.props.currCurrency}
                  qtyIncrease={this.props.qtyIncrease}
                  qtyDecrease={this.props.qtyDecrease}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}
