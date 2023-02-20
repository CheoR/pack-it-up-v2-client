import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      _id
      name
      box_id
      description
      isFragile
      user_id
    }
  }
`;

export const GET_PAGE_DATA = gql`
  query GetItems {
    getItemsByUserId {
      _id
      name
      box_id
      description
      isFragile
      value
    }
  }
  query getBoxesDropdown {
    getBoxesByUserId {
      _id
      name
    }
  }
`;

export const GET_ITEMS = gql`
  query GetItems {
    getItemsByUserId {
      _id
      name
      box_id
      description
      isFragile
      value
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation RemoveItem($input: ItemIdInput!) {
    removeItem(input: $input) {
      ok
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation ($input: ItemUpdateInput!) {
    updateItem(input: $input) {
      _id
      box_id
      description
      isFragile
      name
      value
    }
  }
`;
