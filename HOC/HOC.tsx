import { useMutation, useQuery } from "@apollo/client";

import Loading from "../components/Loading";
import { GET_ITEMS } from "../graphql/item";

export const withQuery = (WrappedComponent, query, text: string) => {
  return (props) => {
    const { loading, error, data } = useQuery(query);

    if (loading) return <Loading text={text} />;
    if (error) console.info(`Item Error: ${error.message}`);

    return <WrappedComponent data={data} {...props} />;
  };
};

export const withMutation = (WrappedComponent, query, text: string) => {
  return (props) => {
    const [createObj] = useMutation(query, {
      // TODO:
      // const [ createItem, { data, loading, error }]
      // review update funciton to avoid making extra query call
      // after mutation
      // update(cache, { data })
      refetchQueries: [{ query: GET_ITEMS }, "GetHomeData"],
      onError: (error) => {
        console.log(`Create Item Error: ${error.message}`);
      },
    });

    return <WrappedComponent createObj={createObj} {...props} />;
  };
};
