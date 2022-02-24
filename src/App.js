import { throwServerError } from "@apollo/client";
import React, { Component } from "react";
import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Pages/Cart/Cart";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import ProductList from "./Pages/ProductList/ProductList";

class App extends Component {
  constructor(props) {
    super(props);

    this.currencyChangeHandler = this.currencyChangeHandler.bind(this);

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
              <ProductDescription currCurrency={this.state.currentCurrency} />
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}

export default App;
