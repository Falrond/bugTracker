import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBaAPvS6uvxATqg5PR1Zjqlbs1izMusd38',
  authDomain: 'social-app-96374.firebaseapp.com',
  projectId: 'social-app-96374',
  storageBucket: 'social-app-96374.appspot.com',
  messagingSenderId: '340435990377',
  appId: '1:340435990377:web:b833c7e6ad7b72988eeff8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const { FieldValue } = firebase.firestore;
const storage = firebase.storage();

export { firebase, FieldValue, storage };
