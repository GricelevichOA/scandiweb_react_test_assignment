import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
import cartLogo from "../../Images/button_cart.svg";

export default class ProductCard extends Component {
  render() {
    return (
      <div
        className={`product ${this.props.product.inStock ? null : "img-stock"}`}
      >
        <div className="product__header">
          <div className="product__image">
            <img
              src={this.props.product.gallery[0]}
              alt={this.props.product.id}
            ></img>
          </div>
          {this.props.product.inStock ? null : (
            <div className="stock">
              <div className="stock-text">Out of stock</div>
            </div>
          )}

          {this.props.product.inStock ? (
            <button className="product__add">
              <img src={cartLogo} alt="Add to cart"></img>
            </button>
          ) : null}
        </div>

        <div className="product__name">
          <Link to={`/product/${this.props.product.id}`}>
            {this.props.product.brand} {this.props.product.name}
          </Link>
        </div>
        <div className="product__cost">
          {this.props.product.prices[0].currency.symbol}
          {this.props.product.prices[0].amount}
        </div>
      </div>
    );
  }
}
