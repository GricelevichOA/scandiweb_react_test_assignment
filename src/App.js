import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Pages/Cart/Cart";
import ProductDescription from "./Pages/ProductDescription/ProductDescription";
import ProductList from "./Pages/ProductList/ProductList";
import { client } from "./graphql/client.js";
import { GET_CATEGORIES, GET_CURRENCIES } from "./graphql/queries.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCurrency: {},
      categories: [],
      currencies: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: GET_CATEGORIES,
      })
      .then((res) => {
        this.setState({
          categories: [...res.data.categories],
        });
      });

    client
      .query({
        query: GET_CURRENCIES,
      })
      .then((res) => {
        this.setState({
          currencies: [...res.data.currencies],
        });
      });
  }

  render() {
    return (
      <div className="App">
        <Navbar
          categories={this.state.categories}
          currencies={this.state.currencies}
        />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}

export default App;
