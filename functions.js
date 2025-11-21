
  const firebaseConfig = {
    apiKey: "AIzaSyCk2zvghyx0D6ksfbvtmQK1c6EmhRHr0UY",
    authDomain: "social-media-website-865f5.firebaseapp.com",
    projectId: "social-media-website-865f5",
    storageBucket: "social-media-website-865f5.firebasestorage.app",
    messagingSenderId: "114991280382",
    appId: "1:114991280382:web:cd3950c7fc247a49c4b5af",
    measurementId: "G-PFSRWVR5ND"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Listen for auth state changes
  auth.onAuthStateChanged((user) => {
    if (user) {
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('user-profile').style.display = 'block';
      document.getElementById('user-name').textContent = user.email;
    } else {
      document.getElementById('auth-container').style.display = 'block';
      document.getElementById('user-profile').style.display = 'none';
    }
  });

  // Handle Sign Up
  function handleSignUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return createUserProfile(userCredential.user);
      })
      .then(() => {
        document.getElementById('auth-status').textContent = 'Account created!';
      })
      .catch((error) => {
        document.getElementById('auth-status').textContent = error.message;
      });
  }

  // Handle Login
  function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        document.getElementById('auth-status').textContent = 'Logged in!';
      })
      .catch((error) => {
        document.getElementById('auth-status').textContent = error.message;
      });
  }

  // Handle Logout
  function handleLogout() {
    auth.signOut();
  }

  // Create user profile in Firestore
  function createUserProfile(user) {
    return db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      displayName: '',
      bio: '',
      avatar: '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  // Update user profile
  function updateUserProfile(uid, data) {
    return db.collection('users').doc(uid).update(data);
  }

  // Get user profile
  function getUserProfile(uid) {
    return db.collection('users').doc(uid).get();
  }