import React, { Component } from "react";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import ProductGallery from "../ProductGallery/ProductGallery";
import "./ProductPage.scss";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.setAttribute = this.setAttribute.bind(this);

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

  setAttribute(value) {
    const selectedAttr = this.state.itemToCart.selectedAttributes.find(
      (i) => i.id === value.id
    );

    if (selectedAttr) {
      this.setState((prevState) => ({
        itemToCart: {
          ...prevState.itemToCart,
          selectedAttributes: this.state.itemToCart.selectedAttributes.map(
            (attr, i) =>
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
    const { product } = this.props;

    const price = product.prices.find(
      (pr) => pr.currency.label === this.props.currCurrency
    );

    return (
      <div className="product-page">
        <div className="product-page__gallery">
          <ProductGallery gallery={product.gallery} />
        </div>
        <div className="product-page__info">
          <h1 className="product-page__brand">{product.brand}</h1>
          <h2 className="product-page__name">{product.name}</h2>
          <div className="product-page__attributes">
            {product.attributes.length !== 0 ? (
              <ProductAttributes
                setAttribute={this.setAttribute}
                attributes={product.attributes}
              />
            ) : null}
          </div>

          <div className="product-page__price">
            <h3>Price: </h3>
            <p>
              {price.currency.symbol} {price.amount}
            </p>
          </div>
          <button
            className="product-page__add"
            onClick={() => {
              this.props.onAddToCart(this.state.itemToCart);
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
