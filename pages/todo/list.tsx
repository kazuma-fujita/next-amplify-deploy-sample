import Amplify from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { GetStaticProps, NextPage } from 'next';
import { ListTodos } from '../../components/list-todos';
import { TodoForm } from '../../components/todo-form';
Amplify.configure(awsconfig);

type Props = { pageTitle: string; metaDescription: string };

const TodoListPage: NextPage<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{props.pageTitle}</title>
        <meta name='description' content={props.metaDescription} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.mb}>
          <h2 className={styles.title}>{props.pageTitle}</h2>
        </div>
        <div className={styles.mb}>
          <TodoForm />
        </div>
        <ListTodos />
      </main>
    </div>
  );
};

export default TodoListPage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      pageTitle: 'Todo List',
      metaDescription: 'This page is sample of Amplify API.',
    },
  };
};
