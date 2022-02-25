import React, { Component } from "react";
import "./ProductPage.scss";

export default class ProductPage extends Component {
  render() {
    const { product } = this.props;

    const price = product.prices.find(
      (pr) => pr.currency.label === this.props.currCurrency
    );

    return (
      <div className="product-page">
        <div className="product-page__gallery">
          <img src={product.gallery[0]} alt={product}></img>
        </div>
        <div className="product-page__info">
          <h1 className="product-page__brand">{product.brand}</h1>
          <h2 className="product-page__name">{product.name}</h2>
          <div className="product-page__attributes"></div>
          <div className="product-page__price">
            <h3>Price: </h3>
            <p>
              {price.currency.symbol} {price.amount}
            </p>
          </div>
          <button
            className="product-page__add"
            onClick={() => {
              this.props.onAddToCart(product);
            }}
          >
            Add to cart
          </button>
          <div
            className="product-page__desription"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
      </div>
    );
  }
}
