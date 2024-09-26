importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
const firebaseConfig = {
    apiKey: "AIzaSyC1ixjh89k15Yo21PF0FWQEEjdaUD6BlP8",
    authDomain: "jcop-reactfe.firebaseapp.com",
    projectId: "jcop-reactfe",
    storageBucket: "jcop-reactfe.appspot.com",
    messagingSenderId: "405974988768",
    appId: "1:405974988768:web:830662711653d8e273dd85",
    measurementId: "G-QTLEC3W7V0"
  };
  firebase.initializeApp(firebaseConfig);

 // Retrieve firebase messaging
 const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });