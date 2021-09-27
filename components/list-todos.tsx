import { useFetchListTodos } from "../hooks/todo/use-fetch-list-todos";
import styles from "../styles/Home.module.css";

export const ListTodos: React.FC = () => {
  const { data, setData, error } = useFetchListTodos();
  return (
    <>
      {error && <p className={styles.description}>{error}</p>}
      {!error && !data && <p className={styles.description}>Now Loading</p>}
      {data &&
        data.map((item) => (
          <div className={styles.grid} key={item.id}>
            {item.name}&nbsp;{item.description}
          </div>
        ))}
    </>
  );
};
