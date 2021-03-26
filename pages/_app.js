import '../styles/globals.css';
import { FirebaseProvider } from '../src/context/firebase';
import Header from '../src/components/header';
import { UserProvider } from '../src/context/user';
import { ProjectsProvider } from '../src/context/projects';

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <UserProvider>
        <ProjectsProvider>
          <Header />
          <Component {...pageProps} />
        </ProjectsProvider>
      </UserProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
