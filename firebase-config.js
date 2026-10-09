// firebase-config.js
// ONE place for your Firebase setup. Every page imports from this file,
// so if you ever change projects you only edit it here.

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

import { getAuth }
    from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

import { getFirestore }
    from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyD5827waZLxQ72mJvcPKuGXeppdLES1QxA",
    authDomain: "trinity-green-energy.firebaseapp.com",
    projectId: "trinity-green-energy",
    storageBucket: "trinity-green-energy.firebasestorage.app",
    messagingSenderId: "186084209724",
    appId: "1:186084209724:web:4a187b8e51417b21d27f39"
};


const app = initializeApp(firebaseConfig);

// Other pages use these two:
export const auth = getAuth(app);       // login / signup / logout
export const db = getFirestore(app);    // saving and reading data
