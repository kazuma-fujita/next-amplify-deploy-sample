import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../../src/graphql/queries';
import { ListTodosQuery, Todo } from '../../src/API';
import useSWR from 'swr';

export const useFetchListTodos = () => {
  const fetcher = async () => {
    const result = (await API.graphql(graphqlOperation(listTodos))) as GraphQLResult<ListTodosQuery>;
    if (result.data && result.data.listTodos && result.data.listTodos.items) {
      return result.data.listTodos.items as Todo[];
    } else {
      throw Error('An API fetched data but it returned null.');
    }
  };
  // const { data, error, mutate } = useSWR('listTodos', fetcher, { fallbackData: [] });
  const { data, error, mutate } = useSWR('listTodos', fetcher);
  return { data, error, mutate };
};
