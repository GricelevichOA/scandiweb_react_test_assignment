import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Pages/Cart/Cart";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import ProductList from "./Pages/ProductList/ProductList";

class App extends Component {
  constructor(props) {
    super(props);

    this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
    this.addToCart = this.onAddToCart.bind(this);

    this.state = {
      currentCurrency: "USD",
      currentCart: [],
    };
  }

  currencyChangeHandler(currency) {
    this.setState({
      currentCurrency: currency,
    });
  }

  onAddToCart(item) {
    const cartItem = {
      id: item.id,
      brand: item.brand,
      name: item.name,
      image: item.gallery[0],
      prices: [...item.prices],
      key: Date.now(),
    };

    const itemInCart = this.state.currentCart.find((i) => i.id === item.id);

    if (itemInCart) {
      this.setState({
        currentCart: this.state.currentCart.map((i) =>
          i.id === item.id ? { ...itemInCart, qty: itemInCart.qty + 1 } : i
        ),
      });
    } else {
      this.setState({
        currentCart: [...this.state.currentCart, { ...cartItem, qty: 1 }],
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar
          changeCurrency={this.currencyChangeHandler}
          currCurrency={this.state.currentCurrency}
        />
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
                addToCart={this.addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cart={this.state.currentCart} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
