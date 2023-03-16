import { useMutation, useQuery } from "@apollo/client";

import Loading from "../components/Loading";

export const withQuery = (WrappedComponent, query, text: string) => {
  return (props) => {
    const { loading, error, data } = useQuery(query);

    if (loading) return <Loading text={text} />;
    if (error) console.info(`${text} Error: ${error.message}`);

    return <WrappedComponent data={data} {...props} />;
  };
};

export const withMutation = (
  WrappedComponent,
  mutation,
  query,
  text: string
) => {
  return (props) => {
    const [createObj] = useMutation(mutation, {
      // TODO:
      // const [ createItem, { data, loading, error }]
      // review update funciton to avoid making extra query call
      // after mutation
      // update(cache, { data })
      refetchQueries: [{ query }, "GetHomeData"],
      onError: (error) => {
        console.log(`Create ${text} Error: ${error.message}`);
      },
    });

    return <WrappedComponent createObj={createObj} {...props} />;
  };
};
