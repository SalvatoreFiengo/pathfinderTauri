import { FirebaseApp, initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration

function App() {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREB_APIKEY,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    measurementId: import.meta.env.VITE_measurementId
  };
  
  // const firebase = initializeApp(firebaseConfig);
  // const db = getFirestore(firebase);

  return (
    <div>
      <h1>Welcome</h1>


    </div>
  );
}

export default App;

