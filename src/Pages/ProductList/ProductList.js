import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCTS } from "../../graphql/queries";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./ProductList.scss";

export default class ProductList extends Component {
  render() {
    return (
      <div>
        <Query
          query={GET_PRODUCTS}
          variables={{
            input: {
              title: this.props.currentCategory,
            },
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <h2>Loading...</h2>;
            if (error) console.log(error);

            console.log(data.category);
            return (
              <div>
                <h1 className="category__header">{data.category.name}</h1>
                <div className="products">
                  {data.category.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
