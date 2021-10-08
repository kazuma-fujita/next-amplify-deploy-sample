import { API, graphqlOperation } from 'aws-amplify';
import { useCallback, useState } from 'react';
import { deleteTodo } from '../../src/graphql/mutations';
import { DeleteTodoInput, DeleteTodoMutationVariables } from '../../src/API';

export const useRemoveTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const removeTodo = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const todo: DeleteTodoInput = { id: id };
      const variables: DeleteTodoMutationVariables = { input: todo };
      const deletedTodo = await API.graphql(graphqlOperation(deleteTodo, variables));
      setIsLoading(false);
      console.log('deleteTodo:', deletedTodo);
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
      console.error('delete error:', error);
    }
  }, []);
  return { removeTodo, isLoading, error };
};
