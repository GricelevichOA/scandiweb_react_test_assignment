import React, { Component, Fragment } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCT } from "../../graphql/queries";
import ProductPage from "../../Components/ProductPage/ProductPage";
import { withParmans } from "../../hocs/hocs.js";
import PropTypes from "prop-types";

class ProductDescription extends Component {
  render() {
    return (
      <Fragment>
        <Query
          query={GET_PRODUCT}
          variables={{
            productId: this.props.params.id,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <h2>Loading....</h2>;
            if (error) return console.log(error);

            return (
              <ProductPage
                product={data.product}
                currCurrency={this.props.currCurrency}
                onAddToCart={this.props.onAddToCart}
                onRemoveFromCart={this.props.onRemoveFromCart}
                cart={this.props.cart}
              />
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

ProductDescription.propTypes = {
  params: PropTypes.object,
  cart: PropTypes.array,
  currCurrency: PropTypes.string,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
};

export default withParmans(ProductDescription);
