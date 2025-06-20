// // src/serviceWorkerRegistration.ts

// const isLocalhost = Boolean(
//     window.location.hostname === 'localhost' ||
//       window.location.hostname === '[::1]' ||
//       window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
//   );
  
//   type Config = {
//     onSuccess?: (registration: ServiceWorkerRegistration) => void;
//     onUpdate?: (registration: ServiceWorkerRegistration) => void;
//   };
  
//   export function register(config?: Config) {
//     if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//       const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
//       if (publicUrl.origin !== window.location.origin) {
//         return;
//       }
  
//       window.addEventListener('load', () => {
//         const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
//         if (isLocalhost) {
//           checkValidServiceWorker(swUrl, config);
//         } else {
//           registerValidSW(swUrl, config);
//         }
//       });
//     }
//   }
  
//   function registerValidSW(swUrl: string, config?: Config) {
//     navigator.serviceWorker
//       .register(swUrl)
//       .then((registration) => {
//         registration.onupdatefound = () => {
//           const installingWorker = registration.installing;
//           if (installingWorker == null) {
//             return;
//           }
//           installingWorker.onstatechange = () => {
//             if (installingWorker.state === 'installed') {
//               if (navigator.serviceWorker.controller) {
//                 console.log('New content is available; please refresh.');
//                 if (config && config.onUpdate) {
//                   config.onUpdate(registration);
//                 }
//               } else {
//                 console.log('Content is cached for offline use.');
//                 if (config && config.onSuccess) {
//                   config.onSuccess(registration);
//                 }
//               }
//             }
//           };
//         };
//       })
//       .catch((error) => {
//         console.error('Error during service worker registration:', error);
//       });
//   }
  
//   function checkValidServiceWorker(swUrl: string, config?: Config) {
//     fetch(swUrl, {
//       headers: { 'Service-Worker': 'script' },
//     })
//       .then((response) => {
//         const contentType = response.headers.get('content-type');
//         if (
//           response.status === 404 ||
//           (contentType != null && contentType.indexOf('javascript') === -1)
//         ) {
//           navigator.serviceWorker.ready.then((registration) => {
//             registration.unregister().then(() => {
//               window.location.reload();
//             });
//           });
//         } else {
//           registerValidSW(swUrl, config);
//         }
//       })
//       .catch(() => {
//         console.log('No internet connection found. App is running in offline mode.');
//       });
//   }
  
//   export function unregister() {
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.ready
//         .then((registration) => {
//           registration.unregister();
//         })
//         .catch((error) => {
//           console.error(error.message);
//         });
//     }
//   }

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}