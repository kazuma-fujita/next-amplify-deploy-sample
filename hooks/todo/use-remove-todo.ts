import { API, graphqlOperation } from 'aws-amplify';
import { useCallback, useState } from 'react';
import { deleteTodo } from '../../src/graphql/mutations';
import { DeleteTodoInput, DeleteTodoMutationVariables, Todo } from '../../src/API';
import { useSWRConfig } from 'swr';
import { parseErrorResponse } from '../../lib/parse-error-response';

export const useRemoveTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const removeTodo = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const todo: DeleteTodoInput = { id: id };
      const variables: DeleteTodoMutationVariables = { input: todo };
      await API.graphql(graphqlOperation(deleteTodo, variables));
      setIsLoading(false);
      setError(null);
      console.log('Deleted todo');
    } catch (error) {
      setIsLoading(false);
      setError(parseErrorResponse(error));
    }
  }, []);
  return { removeTodo, isLoading, error };
};

// export const useRemoveTodo = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const { mutate } = useSWRConfig();

//   const removeTodo = useCallback(async (id: string) => {
//     setIsLoading(true);
//     try {
//       mutate(
//         'listTodos',
//         async (data: Todo[]) => {
//           const todo: DeleteTodoInput = { id: id };
//           const variables: DeleteTodoMutationVariables = { input: todo };
//           await API.graphql(graphqlOperation(deleteTodo, variables));
//           setIsLoading(false);
//           setError(null);
//           return data.filter((item) => item.id !== id);
//         },
//         false
//       );
//     } catch (error) {
//       setIsLoading(false);
//       setError(error as Error);
//       console.error('delete error:', error);
//     }
//   }, []);
//   return { removeTodo, isLoading, error };
// };
