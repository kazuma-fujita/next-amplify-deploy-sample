import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { createTodo } from '../../src/graphql/mutations';
import { ListTodos } from '../../components/list-todos';
Amplify.configure(awsconfig);

type Props = { pageTitle: string; metaDescription: string };

const CreateTodoPage: NextPage<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{props.pageTitle}</title>
        <meta name='description' content={props.metaDescription} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>{props.pageTitle}</h2>
        <input />
        <Link href={'/todo/list'}>
          <a className={styles.button}>Create</a>
        </Link>
      </main>
    </div>
  );
};

export default CreateTodoPage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      pageTitle: 'Create Todo',
      metaDescription: 'This page is sample of Amplify API.',
    },
  };
};
