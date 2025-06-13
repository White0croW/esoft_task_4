import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { BookPageProvider, BookPageContext } from '../contexts/BookPageContext';
import ReadingSettings from '../components/ReadingSettings';

function BookPageContent() {
    const { id } = useParams();
    const { books, toggleFavorite, favorites } = useContext(AppContext);
    const { textSettings } = useContext(BookPageContext);
    const [book, setBook] = useState(null);

    useEffect(() => {
        const foundBook = books.find(b => b.id === id);
        setBook(foundBook);
    }, [id, books]);

    if (!book) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2>Книга не найдена</h2>
                <Link to="/" style={{ color: 'var(--primary)' }}>Вернуться к списку</Link>
            </div>
        );
    }

    const isFavorite = favorites.includes(book.id);

    const textStyle = {
        color: textSettings.color,
        fontSize: textSettings.size === 'small' ? '14px' :
            textSettings.size === 'medium' ? '16px' : '18px',
        fontWeight: textSettings.bold ? 'bold' : 'normal',
        lineHeight: '1.6'
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/" style={{ color: 'var(--primary)', display: 'inline-block', marginBottom: '20px' }}>
                    ← Назад к списку
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px' }}>
                <div>
                    <div style={{
                        height: '400px',
                        background: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}>
                        {book.cover ? (
                            <img src={book.cover} alt={book.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        ) : (
                            <span style={{ color: '#777' }}>Обложка отсутствует</span>
                        )}
                    </div>

                    <button
                        onClick={() => toggleFavorite(book.id)}
                        style={{
                            width: '100%',
                            background: isFavorite ? 'var(--danger)' : 'var(--primary)'
                        }}
                    >
                        {isFavorite ? '❤️ Убрать из избранного' : '🤍 Добавить в избранное'}
                    </button>
                </div>

                <div>
                    <h1 style={{ marginBottom: '10px' }}>{book.title}</h1>
                    <h2 style={{ marginBottom: '20px', color: 'var(--secondary)' }}>{book.author}</h2>

                    <div style={{ marginBottom: '30px' }}>
                        <p><strong>Год издания:</strong> {book.year}</p>
                        <p><strong>Описание:</strong> {book.description}</p>
                    </div>

                    <ReadingSettings />

                    <div style={{ marginTop: '30px' }}>
                        <h3>Содержание</h3>
                        <div style={{ ...textStyle, marginTop: '15px' }}>
                            {book.content}
                            <p style={{ marginTop: '15px' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
                                nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies
                                nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt,
                                nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BookPage() {
    return (
        <BookPageProvider>
            <BookPageContent />
        </BookPageProvider>
    );
}

export default BookPage;