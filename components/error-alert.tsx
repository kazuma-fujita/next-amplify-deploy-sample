import styles from '../styles/Home.module.css';

type Props = {
  children: string | Error;
};

export const ErrorAlert = (props: Props) => {
  const errorMessage = props.children instanceof Error ? props.children.message : props.children;
  return (
    <div className={styles.mt}>
      <div className={styles.error}>
        {errorMessage.split('\n').map((item) => (
          <div>{item}</div>
        ))}
      </div>
    </div>
  );
};
