import React, { Component, Fragment } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCT } from "../../graphql/queries";
import ProductPage from "../../Components/ProductPage/ProductPage";
import { withParmans } from "../../hocs/hocs.js";

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

            // console.log(data.product);

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

export default withParmans(ProductDescription);
