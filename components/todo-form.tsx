import { FormEvent } from 'react';
import { useInput } from '../hooks/todo/use-input';

export const TodoForm: React.FC = () => {
  const title = useInput('');
  const description = useInput('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(title);
    console.log(description);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title: <input type='text' {...title} />
      </label>
      <label>
        Description: <input type='text' {...description} />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
};
