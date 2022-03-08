import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
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
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.onRemoveFromCart = this.onRemoveFromCart.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
    this.qtyIncrease = this.qtyIncrease.bind(this);
    this.qtyDecrease = this.qtyDecrease.bind(this);

    this.state = {
      currentCurrency: "USD",
      currentCategory: "all",
      currentCart: [],
      miniCartDisplay: false,
    };
  }

  // changing current currency
  currencyChangeHandler(currency) {
    this.setState({
      currentCurrency: currency,
    });
  }

  // category changer
  categoryChangeHandler(category) {
    this.setState({
      currentCategory: category,
    });
  }

  // cart management
  // add item to cart
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

  // remove item from cart
  onRemoveFromCart(item) {
    const itemInCart = this.state.currentCart.find((i) => i.id === item.id);
    if (itemInCart) {
      this.setState({
        currentCart: this.state.currentCart.filter((i) => i.id !== item.id),
      });
    }
  }

  // increase quantity
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

  // decrease quantity
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

  // minicart
  // show|hide minicart
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
          changeCategory={this.categoryChangeHandler}
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
          <Route
            path="/"
            element={
              <ProductList
                currCurrency={this.state.currentCurrency}
                currentCategory={this.state.currentCategory}
                onAddToCart={this.onAddToCart}
                onRemoveFromCart={this.onRemoveFromCart}
                cart={this.state.currentCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDescription
                currCurrency={this.state.currentCurrency}
                onAddToCart={this.onAddToCart}
                onRemoveFromCart={this.onRemoveFromCart}
                cart={this.state.currentCart}
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
