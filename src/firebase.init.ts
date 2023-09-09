// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAypN8bzaia6kwQ8nV59b2I2DHxl5MJItM',
  authDomain: 'red-hilfe.firebaseapp.com',
  projectId: 'red-hilfe',
  storageBucket: 'red-hilfe.appspot.com',
  messagingSenderId: '866722391291',
  appId: '1:866722391291:web:b056706d1b9a1077d4fc5e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
export const googleProvider = new GoogleAuthProvider();
