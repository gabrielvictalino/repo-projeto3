import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function boot() {
  // Try to dynamically import react-router-dom and render with BrowserRouter.
  // If anything throws (missing module or runtime hook errors), fall back
  // to rendering the app without a router so the UI stays visible.
  try {
    const rr = await import('react-router-dom');
    try {
      root.render(
        <React.StrictMode>
          <rr.BrowserRouter>
            <App />
          </rr.BrowserRouter>
        </React.StrictMode>
      );
      return;
    } catch (renderErr) {
      // Rendering with BrowserRouter failed at runtime (possible duplicate React).
      // Fall through to plain render below.
      // eslint-disable-next-line no-console
      console.warn('BrowserRouter render failed, falling back to plain App render', renderErr);
    }
  } catch (importErr) {
    // Module not available or import failed.
    // eslint-disable-next-line no-console
    console.warn('react-router-dom not available, rendering without router', importErr);
  }

  // Fallback render without router
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

boot().catch(err => {
  // Last-resort catch
  // eslint-disable-next-line no-console
  console.error('Failed to boot app:', err);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
