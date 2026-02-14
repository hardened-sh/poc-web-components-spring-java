import React from 'react';
import ReactDOM from 'react-dom/client';
import { CheckoutPage } from './pages/CheckoutPage';
import './index.css';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <CheckoutPage />
    </React.StrictMode>
  );
}
