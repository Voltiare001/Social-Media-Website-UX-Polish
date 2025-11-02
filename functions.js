
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};


 // Sign Up Flow
  function signUp(email, password)
   {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Success! User created
        console.log("Welcome!", user);
      })
      .catch((error) => {
        // Oops! Something went wrong
        alert(error.message);
      });
  }

  // Login Flow
  function login(email, password) 
  {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Success! User logged in
      });
  }

  // Logout Flow
  function logout() 
  {
    firebase.auth().signOut();
  }