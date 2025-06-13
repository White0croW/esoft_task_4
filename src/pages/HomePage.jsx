import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import Filters from '../components/Filters';
import BookList from '../components/BookList';
import { useDebounce } from '../hooks/useDebounce';

function HomePage() {
    const {
        filteredBooks,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters
    } = useContext(AppContext);

    const [searchParams] = useSearchParams();
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Восстановление состояния из URL параметров
    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());

        if (params.search) {
            setSearchQuery(params.search);
        }

        if (params.authors) {
            const authors = Array.isArray(params.authors)
                ? params.authors
                : [params.authors];
            setFilters(prev => ({ ...prev, authors }));
        }

        if (params.yearMin || params.yearMax) {
            setFilters(prev => ({
                ...prev,
                yearRange: [
                    params.yearMin ? parseInt(params.yearMin) : 1900,
                    params.yearMax ? parseInt(params.yearMax) : 2023
                ]
            }));
        }

        if (params.favorites) {
            setFilters(prev => ({ ...prev, favoritesOnly: params.favorites === 'true' }));
        }
    }, [searchParams, setSearchQuery, setFilters]);

    // Обновление URL при изменении фильтров
    useEffect(() => {
        const params = new URLSearchParams();

        if (debouncedSearchQuery) {
            params.set('search', debouncedSearchQuery);
        }

        if (filters.authors.length > 0) {
            filters.authors.forEach(author => {
                params.append('authors', author);
            });
        }

        if (filters.yearRange[0] !== 1900 || filters.yearRange[1] !== 2023) {
            params.set('yearMin', filters.yearRange[0]);
            params.set('yearMax', filters.yearRange[1]);
        }

        if (filters.favoritesOnly) {
            params.set('favorites', 'true');
        }

        // Обновление URL без перезагрузки страницы
        const newUrl = params.toString() ? `/?${params.toString()}` : '/';
        window.history.replaceState(null, '', newUrl);
    }, [debouncedSearchQuery, filters]);

    return (
        <div>
            <h1 style={{ marginBottom: '20px' }}>Коллекция книг</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
                <Filters />
                <BookList books={filteredBooks} />
            </div>
        </div>
    );
}

export default HomePage;