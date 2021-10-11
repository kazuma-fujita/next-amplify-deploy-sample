import { API, graphqlOperation } from 'aws-amplify';
import { useCallback, useState } from 'react';
import { createTodo } from '../../src/graphql/mutations';
import { CreateTodoMutationVariables, CreateTodoInput, Todo, CreateTodoMutation } from '../../src/API';
import { useSWRConfig } from 'swr';
import { GraphQLResult } from '@aws-amplify/api';

export const useAddTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const addTodo = useCallback(async (name: string, description: string) => {
    setIsLoading(true);
    try {
      mutate(
        'listTodos',
        async (data: Todo[]) => {
          const todo: CreateTodoInput = { name: name, description: description };
          const variables: CreateTodoMutationVariables = { input: todo };
          const result: GraphQLResult<CreateTodoMutation> = await API.graphql(graphqlOperation(createTodo, variables));
          setIsLoading(false);
          setError(null);
          if (result.data && result.data.createTodo) {
            console.log('newTodo:', result.data.createTodo);
            return [...data, result.data.createTodo];
          } else {
            throw Error('An API created data but it returned null.');
          }
        },
        false
      );
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
      console.error('create error:', error);
    }
  }, []);
  return { addTodo, isLoading, error };
};
