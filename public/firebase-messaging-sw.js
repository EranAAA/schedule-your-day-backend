// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
   apiKey: "AIzaSyAp7-9uhBHa_nUd1wKOe6HMHyXuzEceg94",
   authDomain: "scheduleyourday-3b616.firebaseapp.com",
   projectId: "scheduleyourday-3b616",
   storageBucket: "scheduleyourday-3b616.appspot.com",
   messagingSenderId: "1066725164973",
   appId: "1:1066725164973:web:d47130ca645b4183fac324",
   measurementId: "G-RFVGEP2VNX"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});