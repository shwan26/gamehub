import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Store from './pages/index';
import CartPage from './pages/cart';
import LibraryPage from './pages/library';
import TransactionPage from './pages/transaction';
import ProfilePage from './pages/profile';
import GameDetail from './components/GameDetail'; // Ensure this is the correct path

const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {/* <Sidebar /> */}
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="game/:id" element={<GameDetail />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="transaction/:id" element={<TransactionPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
