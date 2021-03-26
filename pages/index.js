import Head from 'next/head';
import { useEffect, useState } from 'react';
import { UserProvider } from '../src/context/user';
import { useFirebaseContext } from '../src/context/firebase';
import ProjectList from '../src/components/project-list';
import InputBar from '../src/components/input-bar';
import { useRouter } from 'next/router';
import { useUserContext } from '../src/context/user';

export default function Home() {
  const { firebase } = useFirebaseContext();
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    document.title = 'BugTracker';
  }, []);

  return (
    <>
      <Head>
        <title>BugTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InputBar />
      <ProjectList />
    </>
  );
}

// client side rendered app
// database which is Firebase
// tailwind css

// folder structure
// components,
// constants,
// context,
// helpers,
// lib,
// services (firebase functions in here)
// styles
