import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../../src/graphql/queries';
import { ListTodosQuery, Todo } from '../../src/API';
import useSWR, { Middleware } from 'swr';
import { createTodo } from '../../src/graphql/mutations';
import { parseErrorResponse } from '../../lib/parse-error-response';

export const useFetchListTodos = () => {
  const fetcher = async () => {
    const result: GraphQLResult<ListTodosQuery> = await API.graphql(graphqlOperation(listTodos));
    if (result.data && result.data.listTodos && result.data.listTodos.items) {
      return result.data.listTodos.items as Todo[];
    } else {
      throw Error('An API fetched data but it returned null.');
    }
  };
  // const { data, error, mutate } = useSWR('listTodos', fetcher, { fallbackData: [] });
  // const { data, error, mutate } = useSWR<Todo[], Error>('listTodos', fetcher);
  // const { data, error: errorResult } = useSWR('listTodos', fetcher, { use: [loggingMiddleware] });
  const { data, error: errorResult } = useSWR('listTodos', fetcher);
  const error = parseErrorResponse(errorResult);
  return { data, error };
};
