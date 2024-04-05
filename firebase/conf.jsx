import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.PUBLIC_API_KEY,
  authDomain: process.env.PUBLIC_AUTH_DOMAIN,
  projectId: 'crime-justice-dir',
  storageBucket: process.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: '651067344773',
  appId: process.env.PUBLIC_APP_ID,
  measurementId: 'G-QSSYMLJTPK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {app, db, getFirestore, collection, addDoc, getDocs, query, where};
