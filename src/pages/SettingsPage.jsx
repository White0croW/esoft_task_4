import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ThemePreview from '../components/ThemePreview';
import ReadingSettings from '../components/ReadingSettings';
import { initialBooks } from '../data/books';

function SettingsPage() {
    const { resetFavorites, addBook } = useContext(AppContext);

    const loadSampleBooks = () => {
        if (window.confirm('Загрузить примеры книг? Существующие книги будут сохранены.')) {
            initialBooks.forEach(book => addBook(book));
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: '20px' }}>Настройки приложения</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                    <h2 style={{ marginBottom: '20px' }}>Тема оформления</h2>
                    <ThemePreview />
                </div>

                <div>
                    <h2 style={{ marginBottom: '20px' }}>Настройки чтения</h2>
                    <p style={{ marginBottom: '15px' }}>
                        Эти настройки будут применены по умолчанию при открытии новых книг
                    </p>
                    <ReadingSettings />
                </div>
            </div>

            <div style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid var(--border)' }}>
                <h2 style={{ marginBottom: '20px' }}>Управление данными</h2>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <button
                        onClick={resetFavorites}
                        style={{ background: 'var(--danger)' }}
                    >
                        Сбросить все избранное
                    </button>

                    <button
                        onClick={loadSampleBooks}
                        style={{ background: 'var(--success)' }}
                    >
                        Загрузить примеры книг
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/" style={{ color: 'var(--primary)' }}>← Вернуться на главную</Link>
            </div>
        </div>
    );
}

export default SettingsPage;