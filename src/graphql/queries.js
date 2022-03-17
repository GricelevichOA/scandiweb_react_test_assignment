import { gql } from "@apollo/client";

export const GET_CURRENCIES = gql`
  query Query {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Query {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Query($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        inStock
        gallery
        brand
        attributes {
          id
          items {
            displayValue
            id
            value
          }
          name
          type
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Query($productId: String!) {
    product(id: $productId) {
      brand
      attributes {
        id
        items {
          displayValue
          id
          value
        }
        name
        type
      }
      description
      gallery
      id
      inStock
      name
      prices {
        amount
        currency {
          symbol
          label
        }
      }
    }
  }
`;
