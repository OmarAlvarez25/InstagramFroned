// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA9zEqPGN9fLvzylFCzLz4CEF2XC2n4opc',
  authDomain: 'instagram-v2-dbd62.firebaseapp.com',
  projectId: 'instagram-v2-dbd62',
  storageBucket: 'instagram-v2-dbd62.appspot.com',
  messagingSenderId: '863570941508',
  appId: '1:863570941508:web:9649a917743f2b2d024e11',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseDB = getFirestore(app);

export const firebaseAuth = getAuth();
