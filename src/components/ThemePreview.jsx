import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function ThemePreview() {
    const { theme, toggleTheme } = useContext(AppContext);

    const previewBooks = [
        { title: 'Книга 1', author: 'Автор 1' },
        { title: 'Книга 2', author: 'Автор 2' },
        { title: 'Книга 3', author: 'Автор 3' }
    ];

    return (
        <div className="theme-preview">
            <h3>Предпросмотр темы</h3>

            <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
                {previewBooks.map((book, index) => (
                    <div
                        key={index}
                        className="card"
                        style={{ width: '100px', height: '150px', padding: '10px' }}
                    >
                        <div style={{
                            height: '70px',
                            background: '#ddd',
                            marginBottom: '10px'
                        }}></div>
                        <div style={{ fontSize: '12px' }}>
                            <strong>{book.title}</strong>
                            <p>{book.author}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={toggleTheme}
                style={{ marginTop: '15px' }}
            >
                Переключить на {theme === 'light' ? 'тёмную' : 'светлую'} тему
            </button>
        </div>
    );
}

export default ThemePreview;