import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../../src/graphql/queries';
import { ListTodosQuery, Todo } from '../../src/API';
import useSWR from 'swr';

export const useFetchListTodos = () => {
  const fetcher = async () => {
    const todos = (await API.graphql(graphqlOperation(listTodos))) as GraphQLResult<ListTodosQuery>;
    if (todos.data && todos.data.listTodos && todos.data.listTodos.items) {
      return todos.data.listTodos.items as Todo[];
    } else {
      throw Error('An API fetched data but it returned null.');
    }
  };
  const { error, data } = useSWR('listTodos', fetcher);
  return { data, error };
};
