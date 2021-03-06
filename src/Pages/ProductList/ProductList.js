import React, { Component, Fragment } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCTS } from "../../graphql/queries";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./ProductList.scss";
import { withParmans } from "../../hocs/hocs";
import PropTypes from "prop-types";

class ProductList extends Component {
  render() {
    return (
      <Fragment>
        <Query
          query={GET_PRODUCTS}
          variables={{
            input: {
              title: this.props.currentCategory,
            },
          }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return <h2 className="product-list__loading">Loading...</h2>;
            if (error) console.log(error);

            return (
              <div className="product-list">
                <h1 className="product-list__header">{data.category.name}</h1>
                <div className="product-list__products">
                  {data.category.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      currCurrency={this.props.currCurrency}
                      addToCart={this.props.onAddToCart}
                      removeFromCart={this.props.onRemoveFromCart}
                      cart={this.props.cart}
                    />
                  ))}
                </div>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

ProductList.propTypes = {
  currentCategory: PropTypes.string,
  currCurrency: PropTypes.string,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
  cart: PropTypes.array,
};

export default withParmans(ProductList);
