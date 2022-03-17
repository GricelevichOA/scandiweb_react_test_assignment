import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import "./ProductCard.scss";
import cartLogo from "../../Images/button_cart.svg";
import PropTypes from "prop-types";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.setAttribute = this.setAttribute.bind(this);

    this.state = {
      itemToCart: {
        id: this.props.product.id,
        brand: this.props.product.brand,
        name: this.props.product.name,
        gallery: [...this.props.product.gallery],
        prices: [...this.props.product.prices],
        selectedAttributes: [],
        key: Date.now(),
      },
      attrBlockDisplay: false,
    };
  }

  setAttribute(value) {
    const selectedAttr = this.state.itemToCart.selectedAttributes.find(
      (i) => i.id === value.id
    );

    if (selectedAttr) {
      this.setState((prevState) => ({
        itemToCart: {
          ...prevState.itemToCart,
          selectedAttributes: this.state.itemToCart.selectedAttributes.map(
            (attr) =>
              attr.id === selectedAttr.id ? { ...attr, item: value.item } : attr
          ),
        },
      }));
    } else {
      this.setState((prevState) => ({
        itemToCart: {
          ...prevState.itemToCart,
          selectedAttributes: [
            ...this.state.itemToCart.selectedAttributes,
            value,
          ],
        },
      }));
    }
  }

  render() {
    const price = this.props.product.prices.find(
      (pr) => pr.currency.label === this.props.currCurrency
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

          {this.props.product.inStock ? (
            <button
              onClick={() => {
                this.props.product.attributes.length !== 0
                  ? this.setState({ attrBlockDisplay: true })
                  : this.props.addToCart(this.state.itemToCart);
              }}
              className="product__add"
            >
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
          {price.currency.symbol}
          {price.amount}
        </div>
        {this.state.attrBlockDisplay === true ? (
          <div className="product__buy">
            {this.props.product.inStock &&
            this.props.product.attributes.length !== 0 ? (
              <ProductAttributes
                setAttribute={this.setAttribute}
                attributes={this.props.product.attributes}
              />
            ) : null}
            <div className="product__actions">
              <button
                className="product__apply"
                onClick={() => {
                  this.props.addToCart(this.state.itemToCart);
                }}
              >
                Add to Cart
              </button>
              <button
                className="product__dismiss"
                onClick={() => {
                  this.setState({ attrBlockDisplay: false });
                }}
              >
                X
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object,
  currCurrency: PropTypes.string,
  cart: PropTypes.array,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
};
