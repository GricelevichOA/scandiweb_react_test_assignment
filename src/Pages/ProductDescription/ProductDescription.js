import React, { Component, Fragment } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCT } from "../../graphql/queries";

export default class ProductDescription extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <Fragment>
        <Query
          query={GET_PRODUCT}
          variables={{
            productId: "apple-iphone-12-pro",
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <h2>Loading....</h2>;
            if (error) return console.log(error);

            console.log(data);

            return (
              <div className="product-page">
                {data.product.brand} {data.product.name}
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
