import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../app/page.module.css';
import Layout from '../app/layout';
import { readFilesFromDir } from '../util/get_folders';
import { AdminView } from './AdminPage';

export async function getServerSideProps() {
  const files = await readFilesFromDir(`./src`);
  return { props: { files } };
}

export default function Home({ files }: { files: any[] }) {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/LoginPage');
    }
  }, []);

  return (
      <Layout files={files}>
        <h1>Home</h1>
        <main className={styles.main}>
            <AdminView />
        </main>
      </Layout>
  );
}