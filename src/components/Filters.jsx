import { useContext, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';

function Filters() {
    const { books, filters, setFilters } = useContext(AppContext);

    const uniqueAuthors = useMemo(() => {
        return [...new Set(books.map(book => book.author))];
    }, [books]);

    const handleAuthorChange = (author) => {
        setFilters(prev => ({
            ...prev,
            authors: prev.authors.includes(author)
                ? prev.authors.filter(a => a !== author)
                : [...prev.authors, author]
        }));
    };

    const resetFilters = () => {
        setFilters({
            authors: [],
            yearRange: [1900, 2023],
            favoritesOnly: false
        });
    };

    return (
        <div className="filters" style={{ marginBottom: '20px' }}>
            <h2 style={{ marginBottom: '15px' }}>Фильтры</h2>

            <div style={{ marginBottom: '15px' }}>
                <h4>Авторы</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {uniqueAuthors.map(author => (
                        <label key={author} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                checked={filters.authors.includes(author)}
                                onChange={() => handleAuthorChange(author)}
                                style={{ marginRight: '5px' }}
                            />
                            {author}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4>Год издания: {filters.yearRange[0]} - {filters.yearRange[1]}</h4>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                        type="range"
                        min="1900"
                        max="2023"
                        value={filters.yearRange[0]}
                        onChange={e => setFilters(prev => ({
                            ...prev,
                            yearRange: [parseInt(e.target.value), prev.yearRange[1]]
                        }))}
                    />
                    <input
                        type="range"
                        min="1900"
                        max="2023"
                        value={filters.yearRange[1]}
                        onChange={e => setFilters(prev => ({
                            ...prev,
                            yearRange: [prev.yearRange[0], parseInt(e.target.value)]
                        }))}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={filters.favoritesOnly}
                        onChange={() => setFilters(prev => ({
                            ...prev,
                            favoritesOnly: !prev.favoritesOnly
                        }))}
                        style={{ marginRight: '8px' }}
                    />
                    Только избранные
                </label>
            </div>

            <button onClick={resetFilters} style={{ background: 'var(--danger)' }}>
                Сбросить фильтры
            </button>
        </div>
    );
}

export default Filters;