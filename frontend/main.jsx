import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Create from './Create';
import Paywall from './Paywall';
import Marketplace from './Marketplace';
import Docs from './Docs';
import MyPurchases from './MyPurchases';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<Create />} />
        <Route path="/paywall/:id" element={<Paywall />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/my-purchases" element={<MyPurchases />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
