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
