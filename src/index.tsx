import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Function to request notification permission
function askNotificationPermission() {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
      console.log('Notification permission result:', result);
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then((permissionResult) => {
    if (permissionResult !== 'granted') {
      throw new Error('We weren’t granted permission.');
    }
  });
}

// Function to subscribe the user to push notifications
async function subscribeUserToPush() {
  console.log('Attempting to subscribe user to push notifications...');
  return navigator.serviceWorker.ready.then((registration) => {
    const vapidPublicKey = `BI5CYy3kYA-QdTF9BNAVcpZtEuC2_PTFV1aiVsotlUZ-xwl7WHqr4HsZ_r0hoHINqixsysulTOWTiw5eLlFVn90`; // Replace with your VAPID public key
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
  }).then((subscription) => {
    console.log('User is subscribed:', subscription);
    // Send subscription to your server
    return sendSubscriptionToServer(subscription);
  }).catch((err) => {
    console.error('Failed to subscribe the user:', err);
  });
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Function to send subscription to server
async function sendSubscriptionToServer(subscription: PushSubscription) {
  console.log('Sending subscription to server:', subscription);
  return await fetch('http://localhost:3000/api/save-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to send subscription to server');
    }
    console.log('Subscription sent to server successfully');
  }).catch(error => {
    console.error('Error sending subscription to server:', error);
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Request notification permission and subscribe user when the app initializes
askNotificationPermission().then(() => {
  console.log('Notification permission granted.');
  subscribeUserToPush();
}).catch((error) => {
  console.error('Notification permission denied:', error);
});

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();