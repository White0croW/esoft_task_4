import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const BookCard = memo(({ book }) => {
    const { favorites, toggleFavorite } = useContext(AppContext);
    const isFavorite = favorites.includes(book.id);

    return (
        <div className="card">
            <div style={{ padding: '15px' }}>
                <div style={{ height: '200px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {book.cover ? (
                        <img src={book.cover} alt={book.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    ) : (
                        <span style={{ color: '#777' }}>Обложка отсутствует</span>
                    )}
                </div>

                <div style={{ padding: '15px 0' }}>
                    <h3 style={{ marginBottom: '8px' }}>
                        <Link to={`/book/${book.id}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                            {book.title}
                        </Link>
                    </h3>
                    <p style={{ marginBottom: '8px', color: 'var(--text)' }}>Автор: {book.author}</p>
                    <p style={{ marginBottom: '12px', color: 'var(--text)' }}>Год: {book.year}</p>

                    <button
                        onClick={() => toggleFavorite(book.id)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '0',
                            fontSize: '1.5rem',
                            color: isFavorite ? 'var(--danger)' : 'var(--text)'
                        }}
                    >
                        {isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default BookCard;