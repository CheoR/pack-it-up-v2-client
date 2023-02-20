import { gql } from "@apollo/client";

export const CREATE_BOX = gql`
  mutation CreateBox($input: CreateBoxInput!) {
    createBox(input: $input) {
      _id
      name
      move_id
      description
      user_id
    }
  }
`;

export const GET_BOXES = gql`
  query GetBoxes {
    getBoxesByUserId {
      _id
      count
      description
      isFragile
      move_id
      name
      value
    }
  }
`;

// TODO: fetch subset of move data from cache
export const GET_BOXES_DROPDOWN = gql`
  query getBoxesDropdown {
    getBoxesByUserId {
      _id
      name
    }
  }
`;


export const GET_DROPDOWN_BOXES_FOR_ROW = gql`
  query GetDropdownBoxesForRow {
    getDropdownBoxesForRow {
      _id @client
      name @client
    }
  }
`;


export const REMOVE_BOX = gql`
  mutation RemoveBox($input: BoxIdInput!) {
    removeBox(input: $input) {
      ok
    }
  }
`;
