import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAGSN-8vL2B4GsKo-VHC0mZFdM9iilsaEU',
  authDomain: 'react-firebase-860f9.firebaseapp.com',
  projectId: 'react-firebase-860f9',
  storageBucket: 'react-firebase-860f9.appspot.com',
  messagingSenderId: '873396551582',
  appId: '1:873396551582:web:143e7786dc16628daea08f',
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default {
  firebase,
  db,
}
