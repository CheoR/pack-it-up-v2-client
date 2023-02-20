import { gql } from "@apollo/client";

export const CREATE_MOVE = gql`
  mutation CreateMove($input: CreateMoveInput!) {
    createMove(input: $input) {
      _id
      name
      description
      user_id
    }
  }
`;

export const GET_MOVES = gql`
  query GetMoves {
    getMovesByUserId {
      _id
      count
      description
      isFragile
      name
      value
      user_id
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
