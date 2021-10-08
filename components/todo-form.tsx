import { FormEvent } from 'react';
import { useAddTodo } from '../hooks/todo/use-add-todo';
import { useInput } from '../hooks/todo/use-input';
import styles from '../styles/Home.module.css';

export const TodoForm: React.FC = () => {
  const { addTodo, isLoading, error } = useAddTodo();
  const name = useInput('');
  const description = useInput('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name.value);
    console.log(description.value);
    addTodo(name.value, description.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type='text' {...name} />
        </label>
        <label>
          Description: <input type='text' {...description} />
        </label>
        <input type='submit' value='Submit' disabled={isLoading} />
      </form>
      {error && <div className={styles.error}>{error.message}</div>}
    </>
  );
};
