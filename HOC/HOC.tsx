import { useMutation, useQuery } from "@apollo/client";

import { CREATE_MOVE, GET_MOVES } from "../graphql/move";
import { CREATE_ITEM, GET_ITEMS } from "../graphql/item";
import { CREATE_BOX, GET_BOXES } from "../graphql/box";
import { GET_HOME_DATA } from "../graphql/home";
import Loading from "../components/Loading";

const screen = {
  box: "box",
  home: "home",
  item: "item",
  move: "move",
};

export const withQuery = (WrappedComponent, text: string) => {
  let query;
  if (screen[text] === "box") {
    query = GET_BOXES;
  } else if (screen[text] === "home") {
    query = GET_HOME_DATA;
  } else if (screen[text] === "item") {
    query = GET_ITEMS;
  } else {
    query = GET_MOVES;
  }

  return (props) => {
    const { loading, error, data } = useQuery(query);

    if (loading) return <Loading text={text} />;
    // TODO: better log and address error
    if (error) console.info(`${text} Error: ${error.message}`);

    return <WrappedComponent data={data} {...props} />;
  };
};

// TODO: refactor column3 to use different mutation types
export const withMutation = (WrappedComponent, text: string) => {
  let mutation;
  if (screen[text] === "item") {
    mutation = CREATE_ITEM;
  } else if (screen[text] === "box") {
    mutation = CREATE_BOX;
  } else {
    mutation = CREATE_MOVE;
  }
  return (props) => {
    const [createObj] = useMutation(mutation, {
      // TODO:
      // const [ createItem, { data, loading, error }]
      // review update funciton to avoid making extra query call
      // after mutation
      // update(cache, { data })
      refetchQueries: [
        {
          query: GET_ITEMS,
        },
        {
          query: GET_BOXES,
        },
        {
          query: GET_MOVES,
        },
        "GetHomeData",
      ],
      onError: (error) => {
        console.log(`Create ${text} Error: ${error.message}`);
      },
    });

    return <WrappedComponent createObj={createObj} {...props} />;
  };
};
