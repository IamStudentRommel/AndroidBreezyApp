import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCZxmQxvDZ5Ug3LDXYjSO6UcZ080PsJbcA',
  authDomain: 'crime-justice-dir.firebaseapp.com',
  projectId: 'crime-justice-dir',
  storageBucket: 'crime-justice-dir.appspot.com',
  messagingSenderId: '651067344773',
  appId: '1:651067344773:web:e35016e47e5dc363cfa6ec',
  measurementId: 'G-QSSYMLJTPK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {app, db, getFirestore, collection, addDoc, getDocs, query, where};
