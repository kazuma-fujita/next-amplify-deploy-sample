import { API, graphqlOperation } from 'aws-amplify';
import { useEffect } from 'react';
import { onCreateTodo, onDeleteTodo } from '../../src/graphql/subscriptions';
import { GraphQLResult } from '@aws-amplify/api';
import { OnCreateTodoSubscription, Todo, OnDeleteTodoSubscription } from '../../src/API';
import { Observable } from 'zen-observable-ts';
import useSWR from 'swr';
import { AWSAppSyncRealTimeProvider } from '@aws-amplify/pubsub';
import { useSWRConfig } from 'swr';

// export const useSubscribeTodo = () => {
export const useSubscribeTodo = () => {
  // const { data, mutate } = useSWR<Todo[]>('listTodos', null, { fallbackData: [] });
  const { data, mutate } = useSWR<Todo[]>('listTodos', null);
  // const mutate = useSWRConfig();
  useEffect(() => {
    const pubSubClient: Observable<object> = API.graphql(graphqlOperation(onCreateTodo));
    const subscription = pubSubClient.subscribe({
      next: (payload: { provider: AWSAppSyncRealTimeProvider; value: GraphQLResult<OnCreateTodoSubscription> }) => {
        // console.log('useSubscribeTodo data:', data);
        // if (data && payload.value.data && payload.value.data.onCreateTodo) {
        if (payload.value.data && payload.value.data.onCreateTodo) {
          console.log('Subscribe data: ', payload.value.data.onCreateTodo);
          // mutate([...data, payload.value.data.onCreateTodo], false);
        }
      },
      error: (error) => console.error('Create subscribing error:', error),
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const pubSubClient: Observable<object> = API.graphql(graphqlOperation(onDeleteTodo));
    const subscription = pubSubClient.subscribe({
      next: (payload: { provider: AWSAppSyncRealTimeProvider; value: GraphQLResult<OnDeleteTodoSubscription> }) => {
        console.log('Delete useSubscribeTodo data:', data);
        if (data && payload.value.data && payload.value.data.onDeleteTodo) {
          console.log('Delete Subscribe data: ', payload.value.data.onDeleteTodo);
          const deleteId = payload.value.data.onDeleteTodo.id;
          mutate(
            data.filter((item) => item.id === deleteId),
            false
          );
        }
      },
      error: (error) => console.error('Delete subscribing error:', error),
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
