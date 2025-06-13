import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        authors: [],
        yearRange: [1900, 2023],
        favoritesOnly: false
    });

    // Загрузка данных из localStorage
    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const savedTheme = localStorage.getItem('theme') || 'light';

        setBooks(savedBooks);
        setFavorites(savedFavorites);
        setTheme(savedTheme);
    }, []);

    // Сохранение данных
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem('theme', theme);

        // Обновление атрибута темы
        document.documentElement.setAttribute('data-theme', theme);
    }, [books, favorites, theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    const toggleFavorite = useCallback(id => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(favId => favId !== id)
                : [...prev, id]
        );
    }, []);

    const resetFavorites = useCallback(() => {
        if (window.confirm('Вы уверены, что хотите очистить избранное?')) {
            setFavorites([]);
        }
    }, []);

    const addBook = useCallback(book => {
        setBooks(prev => [...prev, book]);
    }, []);

    const removeBook = useCallback(id => {
        setBooks(prev => prev.filter(b => b.id !== id));
    }, []);

    // Фильтрация книг
    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchesSearch =
                searchQuery === '' ||
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesAuthor = filters.authors.length === 0 ||
                filters.authors.includes(book.author);

            const matchesYear =
                book.year >= filters.yearRange[0] &&
                book.year <= filters.yearRange[1];

            const matchesFavorite =
                !filters.favoritesOnly || favorites.includes(book.id);

            return matchesSearch && matchesAuthor && matchesYear && matchesFavorite;
        });
    }, [books, searchQuery, filters, favorites]);

    const value = {
        theme,
        books,
        favorites,
        filteredBooks,
        searchQuery,
        filters,
        toggleTheme,
        addBook,
        removeBook,
        toggleFavorite,
        resetFavorites,
        setSearchQuery,
        setFilters
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}