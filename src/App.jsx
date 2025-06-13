// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { BookPageProvider } from './contexts/BookPageContext'; // Импорт
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import SettingsPage from './pages/SettingsPage';
import './index.css';

function App() {
  return (
    <AppProvider>
      <BookPageProvider> {/* Оборачиваем в BookPageProvider */}
        <Router>
          <div className="app">
            <Header />
            <main className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/book/:id" element={<BookPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </BookPageProvider>
    </AppProvider>
  );
}

export default App;