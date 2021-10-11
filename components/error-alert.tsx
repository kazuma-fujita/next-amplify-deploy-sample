import styles from '../styles/Home.module.css';

type Props = {
  children: string;
};

export const ErrorAlert = (props: Props) => {
  return (
    <div className={styles.mt}>
      <div className={styles.error}>
        {props.children.split('\n').map((item) => (
          <div>{item}</div>
        ))}
      </div>
    </div>
  );
};
