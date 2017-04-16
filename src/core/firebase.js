import * as firebase from 'firebase';

export const dbRefs = {
  home: 'home',
};

export const firebaseConfig = {
  apiKey: 'AIzaSyBd4xjH6uOJnut5T7RFlW2BRSpFA2TIXXA',
  authDomain: 'react-redux-firebase-for-me.firebaseapp.com',
  databaseURL: 'https://react-redux-firebase-for-me.firebaseio.com',
  storageBucket: 'react-redux-firebase-for-me.appspot.com',
  messagingSenderId: '21616532649',
};


export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDB = firebaseApp.database();
export const firebaseStor = firebase.storage();
export const imagesRef = firebaseStor.ref().child('images');
