'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './page.module.css';
import Layout from './layout';
import { readFilesFromDir } from '../util/get_folders';
import { AdminView } from './Admin/Page';

export default function Home({ files }: { files: any[] }) {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/Login');
    }
  });

  return (
      <Layout>
        <h1>Home</h1>
        <main className={styles.main}>
            <AdminView />
        </main>
      </Layout>
  );
}