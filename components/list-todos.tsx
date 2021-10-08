import { useFetchListTodos } from '../hooks/todo/use-fetch-list-todos';
import styles from '../styles/Home.module.css';
import { useSubscribeTodo } from '../hooks/todo/use-subscribe-todo';
import { useRemoveTodo } from '../hooks/todo/use-remove-todo';

export const ListTodos: React.FC = () => {
  useSubscribeTodo();
  const { error, data } = useFetchListTodos();
  const { removeTodo } = useRemoveTodo();
  console.log('data:', data);
  console.log('error:', error);
  if (error) return <p className={styles.description}>{error.message}</p>;
  if (!data) return <p className={styles.description}>Now Loading</p>;
  return (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Created at</th>
          <th>Updated at</th>
          <th>Delete</th>
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>
              <button className={styles.rm_btn} onClick={() => removeTodo(item.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
