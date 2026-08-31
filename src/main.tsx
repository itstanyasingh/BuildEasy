import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress harmless ResizeObserver loop errors from surfacing in dev overlays
window.addEventListener('error', (event) => {
  if (
    event.message &&
    (event.message.includes('ResizeObserver loop completed with undelivered notifications') ||
     event.message.includes('ResizeObserver loop limit exceeded'))
  ) {
    event.stopImmediatePropagation();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
