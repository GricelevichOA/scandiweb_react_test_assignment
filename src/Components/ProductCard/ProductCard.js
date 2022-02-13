import React, { Component } from "react";
import "./ProductCard.scss";

// this.props.product.gallery[0]
// this.props.product.name
// this.product.proces[0]

export default class ProductCard extends Component {
  render() {
    // console.log(this.props.product);
    return (
      <div className="product">
        <div className="product__image">
          <img
            src={this.props.product.gallery[0]}
            alt={this.props.product.id}
          ></img>
        </div>

        <div className="product__name">
          {this.props.product.brand} {this.props.product.name}
        </div>
        <div className="product__cost">
          {this.props.product.prices[0].currency.symbol}
          {this.props.product.prices[0].amount}
        </div>
      </div>
    );
  }
}
