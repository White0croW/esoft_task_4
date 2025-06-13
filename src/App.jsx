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
      <Router>
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route
                path="/book/:id"
                element={
                  <BookPageProvider>
                    <BookPage />
                  </BookPageProvider>
                }
              />

              <Route
                path="/settings"
                element={
                  <BookPageProvider>
                    <SettingsPage />
                  </BookPageProvider>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;