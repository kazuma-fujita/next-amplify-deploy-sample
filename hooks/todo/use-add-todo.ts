import { API, graphqlOperation } from 'aws-amplify';
import { useCallback, useState } from 'react';
import { createTodo } from '../../src/graphql/mutations';
import { CreateTodoMutationVariables, CreateTodoInput } from '../../src/API';

export const useAddTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const addTodo = useCallback(async (name: string, description: string) => {
    setIsLoading(true);
    try {
      const todo: CreateTodoInput = { name: name, description: description };
      const variables: CreateTodoMutationVariables = { input: todo };
      const newTodo = await API.graphql(graphqlOperation(createTodo, variables));
      setIsLoading(false);
      console.log('newTodo:', newTodo);
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
      console.error('create error:', error);
    }
  }, []);
  return { addTodo, isLoading, error };
};
