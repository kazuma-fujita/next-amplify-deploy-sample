import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { createTodo } from '../../src/graphql/mutations';
import { ListTodos } from '../../components/list-todos';
Amplify.configure(awsconfig);

type Props = { pageTitle: string; metaDescription: string };

const TodoListPage: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{props.pageTitle}</title>
        <meta name='description' content={props.metaDescription} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>{props.pageTitle}</h2>
        <Link href={'/todo/create'}>
          <a className={styles.button}>Create todo</a>
        </Link>
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
