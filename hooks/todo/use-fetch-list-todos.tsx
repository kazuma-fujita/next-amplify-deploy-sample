import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { listTodos } from "../../src/graphql/queries";
import { ListTodosQuery, Todo } from "../../src/API";

export const useFetchListTodos = () => {
  const [data, setData] = useState<Todo[] | null>(null);
  const [error, setError] = useState<String | null>(null);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const todos = (await API.graphql(
          graphqlOperation(listTodos)
        )) as GraphQLResult<ListTodosQuery>;
        if (todos.data && todos.data.listTodos && todos.data.listTodos.items) {
          setData(todos.data.listTodos.items as Todo[]);
        } else {
          setError("A list todos response is null.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Failed fetching list todos.");
      }
    };
    fetcher();
    return () => {};
  }, []);
  return { data, setData, error };
};
