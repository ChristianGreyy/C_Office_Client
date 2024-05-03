// Import the functions you need from the SDKs you need
import { notificationAPI } from "@/api";
import { LogApp } from "@/utils";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  // validKey: import.meta.env.VITE_FIREBASE_VALID_KEY
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  validKey: process.env.NEXT_PUBLIC_FIREBASE_VALID_KEY,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const initToken = () => {
  getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VALID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        // submit token to server
        LogApp(currentToken);
        const userAgent = window.navigator.userAgent;
        console.log({
          token: `${currentToken}`,
          deviceId: `${userAgent}`,
          deviceType: "WEB_PUSH",
        });
        notificationAPI.registerFirebaseToken({
          token: `${currentToken}`,
          deviceId: `${userAgent}`,
          deviceType: "WEB_PUSH",
        });

        // receive msg
        onMessage(messaging, (payload) => {
          console.log('payload', payload)
          LogApp("Receive Message: ", payload);
          // store.dispatch(setNewNotification(payload?.notification));
        });
      } else {
        // Show permission request UI
        LogApp(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log(err)
      // LogApp("An error occurred while retrieving token. ", err);
      // ...
    });
};

export const requestPermission = () => {
  // navigator.serviceWorker.register('/firebase-messaging-sw.js')
  // .then((registration) => {
    Notification.requestPermission().then((permission) => {
      console.log('permission', permission)
      if (permission === "granted") {
        LogApp("Notification permission granted.");
        initToken();
      } else {
        LogApp("Unable to get permission to notify.");
      }
    });
  // })
};
