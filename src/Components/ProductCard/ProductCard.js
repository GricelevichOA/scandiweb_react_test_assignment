import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
import cartLogo from "../../Images/button_cart.svg";
import cross from "../../Images/cross_white.svg";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemToCart: {
        id: this.props.product.id,
        brand: this.props.product.brand,
        name: this.props.product.name,
        image: this.props.product.gallery[0],
        prices: [...this.props.product.prices],
        selectedAttributes: [],
        key: Date.now(),
      },
    };
  }

  render() {
    const price = this.props.product.prices.find(
      (pr) => pr.currency.label === this.props.currCurrency
    );

    const itemInCart = this.props.cart.find(
      (i) => i.id === this.props.product.id
    );

    return (
      <div
        className={`product ${this.props.product.inStock ? null : "img-stock"}`}
      >
        <div className="product__header">
          <Link to={`/product/${this.props.product.id}`}>
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
          </Link>

          {this.props.product.inStock &&
          this.props.product.attributes.length === 0 ? (
            itemInCart ? (
              <button
                onClick={() => {
                  this.props.removeFromCart(this.state.itemToCart);
                }}
                className="product__remove"
              >
                <img src={cross} alt="Remove from cart"></img>
              </button>
            ) : (
              <button
                onClick={() => {
                  this.props.addToCart(this.state.itemToCart);
                }}
                className="product__add"
              >
                <img src={cartLogo} alt="Add to cart"></img>
              </button>
            )
          ) : null}
        </div>

        <div className="product__name">
          <Link to={`/product/${this.props.product.id}`}>
            {this.props.product.brand} {this.props.product.name}
          </Link>
        </div>
        <div className="product__cost">
          {price.currency.symbol}
          {price.amount}
        </div>
      </div>
    );
  }
}
