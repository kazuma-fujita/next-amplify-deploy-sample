import { useFetchListTodos } from '../hooks/todo/use-fetch-list-todos';
import styles from '../styles/Home.module.css';

export const ListTodos: React.FC = () => {
  const { error, data } = useFetchListTodos();
  console.log('data:', data);
  console.log('error:', error);
  if (error) return <p className={styles.description}>{error.message}</p>;
  if (!data) return <p className={styles.description}>Now Loading</p>;
  return (
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Created at</th>
        <th>Updated at</th>
      </tr>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.createdAt}</td>
          <td>{item.updatedAt}</td>
        </tr>
      ))}
    </table>
  );
};
