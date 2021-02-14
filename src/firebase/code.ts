import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const code = firebase.initializeApp(
  {
    apiKey: 'AIzaSyDZWcwR3Z9m7p8ARz78Kkkej-I0znvgMD8',
    authDomain: 'codesite-f4c3d.firebaseapp.com',
    databaseURL: 'https://codesite-f4c3d.firebaseio.com',
    projectId: 'codesite-f4c3d',
    storageBucket: 'codesite-f4c3d.appspot.com',
    messagingSenderId: '48509147893',
    appId: '1:48509147893:web:63f7b98b284661978643bc',
    measurementId: 'G-H4BHWK9YTP',
  },
  'code'
);

export default code;
