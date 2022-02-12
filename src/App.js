import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Pages/Cart/Cart";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import ProductList from "./Pages/ProductList/ProductList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCurrency: "",
      currentCategory: "clothes",
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProductList currentCategory={this.state.currentCategory} />
            }
          />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}

export default App;
