// // Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
   apiKey: "AIzaSyAp7-9uhBHa_nUd1wKOe6HMHyXuzEceg94",
   authDomain: "scheduleyourday-3b616.firebaseapp.com",
   projectId: "scheduleyourday-3b616",
   storageBucket: "scheduleyourday-3b616.appspot.com",
   messagingSenderId: "1066725164973",
   appId: "1:1066725164973:web:d47130ca645b4183fac324",
   measurementId: "G-RFVGEP2VNX"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
   console.log('[firebase-messaging-sw.js] Received background message ', payload);
   // Customize notification here
   const notificationTitle = 'Background Message Title';
   const notificationOptions = {
      title: payload.title,
      body: payload.body,
      icon: '/logo.png'
   };

   self.registration.showNotification(notificationTitle,
      notificationOptions);
});
