import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import MiniCart from "./Components/MiniCart/MiniCart";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Pages/Cart/Cart";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import ProductList from "./Pages/ProductList/ProductList";

class App extends Component {
  constructor(props) {
    super(props);

    this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.onRemoveFromCart = this.onRemoveFromCart.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
    this.qtyIncrease = this.qtyIncrease.bind(this);
    this.qtyDecrease = this.qtyDecrease.bind(this);

    this.state = {
      currentCurrency: "USD",
      currentCart: [],
      miniCartDisplay: false,
    };
  }

  currencyChangeHandler(currency) {
    this.setState({
      currentCurrency: currency,
    });
  }

  onAddToCart(item) {
    const itemInCart = this.state.currentCart.find((i) => i.id === item.id);

    if (itemInCart) {
      this.setState({
        currentCart: this.state.currentCart.map((i) =>
          i.id === item.id
            ? { ...itemInCart, selectedAttributes: item.selectedAttributes }
            : i
        ),
      });
    } else {
      this.setState({
        currentCart: [...this.state.currentCart, { ...item, qty: 1 }],
      });
    }
  }

  onRemoveFromCart(item) {
    const itemInCart = this.state.currentCart.find((i) => i.id === item.id);
    if (itemInCart.qty === 1) {
      this.setState({
        currentCart: this.state.currentCart.filter((i) => i.id !== item.id),
      });
    }
  }

  qtyIncrease(item) {
    const itemInCart = this.state.currentCart.find((i) => i.id === item.id);
    if (itemInCart) {
      this.setState({
        currentCart: this.state.currentCart.map((i) =>
          i.id === item.id ? { ...itemInCart, qty: itemInCart.qty + 1 } : i
        ),
      });
    }
  }

  qtyDecrease(item) {
    const itemInCart = this.state.currentCart.find((i) => i.id === item.id);
    if (itemInCart.qty === 1) {
      this.onRemoveFromCart(item);
    } else {
      this.setState({
        currentCart: this.state.currentCart.map((i) =>
          i.id === item.id ? { ...itemInCart, qty: itemInCart.qty - 1 } : i
        ),
      });
    }
  }

  toggleMiniCart() {
    this.setState({
      miniCartDisplay: !this.state.miniCartDisplay,
    });
  }

  render() {
    const totalItemsInCart = this.state.currentCart.reduce(
      (a, item) => a + item.qty,
      0
    );

    return (
      <div className="App">
        <Navbar
          changeCurrency={this.currencyChangeHandler}
          currCurrency={this.state.currentCurrency}
          totalItemsInCart={totalItemsInCart}
          toggleMiniCart={this.toggleMiniCart}
        />
        {this.state.miniCartDisplay ? (
          <MiniCart
            totalItemsInCart={totalItemsInCart}
            toggleMiniCart={this.toggleMiniCart}
            cart={this.state.currentCart}
            currCurrency={this.state.currentCurrency}
            qtyIncrease={this.qtyIncrease}
            qtyDecrease={this.qtyDecrease}
          />
        ) : null}
        <Routes>
          <Route path="/" element={<Navigate to="/all" />} />
          <Route
            path="/:category"
            element={<ProductList currCurrency={this.state.currentCurrency} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDescription
                currCurrency={this.state.currentCurrency}
                onAddToCart={this.onAddToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={this.state.currentCart}
                currCurrency={this.state.currentCurrency}
                qtyIncrease={this.qtyIncrease}
                qtyDecrease={this.qtyDecrease}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
