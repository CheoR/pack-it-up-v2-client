import { gql } from "@apollo/client";

export const GET_HOME_DATA = gql`
  query GetHomeData {
    getHomeData {
      _id
      count
      description
      isFragile
      name
      value
    }
  }
`;
