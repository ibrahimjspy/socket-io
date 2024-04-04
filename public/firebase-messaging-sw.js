// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAaCI5z6DkyHNfUtwSi2Yji4HotobYhRDU",
  authDomain: "test-notification-30dcf.firebaseapp.com",
  projectId: "test-notification-30dcf",
  storageBucket: "test-notification-30dcf.appspot.com",
  messagingSenderId: "71181934722",
  appId: "1:71181934722:web:d530335cf6dc100ef5949b"
};



firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

self.addEventListener('install', () => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('push', (event) => {
  const data = event.data.json(); // Assuming the message payload is sent as JSON
  console.log('This push event has data: ', data);

  const title = data.notification.title;
  const options = {
    body: data.notification.body,
    // You can add more options here, like icons, images, actions, etc.
  };

  event.waitUntil(self.registration.showNotification(title, options));
});