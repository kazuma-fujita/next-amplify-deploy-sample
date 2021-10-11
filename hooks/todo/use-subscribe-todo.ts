import { API, graphqlOperation } from 'aws-amplify';
import { useEffect } from 'react';
import { onCreateTodo, onDeleteTodo } from '../../src/graphql/subscriptions';
import { GraphQLResult } from '@aws-amplify/api';
import { OnCreateTodoSubscription, Todo, OnDeleteTodoSubscription } from '../../src/API';
import { Observable } from 'zen-observable-ts';
import { AWSAppSyncRealTimeProvider } from '@aws-amplify/pubsub';
import { useSWRConfig } from 'swr';

export const useSubscribeTodo = () => {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    const pubSubClient: Observable<object> = API.graphql(graphqlOperation(onCreateTodo));
    const subscription = pubSubClient.subscribe({
      next: (payload: { provider: AWSAppSyncRealTimeProvider; value: GraphQLResult<OnCreateTodoSubscription> }) => {
        if (payload.value.data && payload.value.data.onCreateTodo) {
          const newTodo = payload.value.data.onCreateTodo;
          console.log('Create Subscribe data: ', payload.value.data.onCreateTodo);
          mutate('listTodos', async (data: Todo[]) => [...data, newTodo], false);
          // mutate('listTodos');
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
        if (payload.value.data && payload.value.data.onDeleteTodo) {
          console.log('Delete Subscribe data: ', payload.value.data.onDeleteTodo);
          const deleteId = payload.value.data.onDeleteTodo.id;
          mutate('listTodos', async (data: Todo[]) => data.filter((item) => item.id !== deleteId), false);
          // mutate('listTodos');
        }
      },
      error: (error) => console.error('Delete subscribing error:', error),
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
