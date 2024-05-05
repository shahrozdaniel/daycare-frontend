// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');
const firebaseConfig = {
    apiKey: "AIzaSyCbqk_0UfbOhLRywEJjL-eVM2_w1J0byAY",
    authDomain: "cooddle-b0900.firebaseapp.com",
    projectId: "cooddle-b0900",
    storageBucket: "cooddle-b0900.appspot.com",
    messagingSenderId: "163144146983",
    appId: "1:163144146983:web:64444dd45626758ba62e02",
    measurementId: "G-ZQK3XGH426"
  };
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});






