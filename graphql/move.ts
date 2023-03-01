import { gql } from "@apollo/client";

export const CREATE_MOVE = gql`
  mutation CreateMove($input: CreateMoveInput!) {
    createMove(input: $input) {
      _id
      boxItems
      count
      description
      name
      user_id
      value
    }
  }
`;

export const GET_MOVES = gql`
  query GetMoves {
    getMovesByUserId {
      _id
      boxItemsCount
      count
      description
      isFragile
      name
      value
    }
  }
`;

export const GET_MOVES_DROPDOWN = gql`
  query getMovesDropdown {
    getMovesByUserId {
      _id
      name
    }
  }
`;

export const REMOVE_MOVE = gql`
  mutation RemoveMove($input: MoveIdInput!) {
    removeMove(input: $input) {
      ok
    }
  }
`;


export const UPDATE_MOVE = gql`
  mutation UPdateMove($input: MoveUpdateInput!) {
    updateMove(input: $input) {
      _id
      name
      description
    }
  }
`
