import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Header() {
    const { theme, toggleTheme, favorites, searchQuery, setSearchQuery } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/?search=${searchQuery}`);
    };

    return (
        <header className="header" style={{ padding: '20px', background: 'var(--primary)', color: 'white' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    BookHub
                </Link>

                <div style={{ position: 'relative', flex: 1, margin: '0 20px' }}>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Поиск книг..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none' }}
                        />
                        {/* Подсказка при фокусе */}
                        <span className="tooltip">Введите название или автора книги</span>
                    </form>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Link to="/settings" style={{ color: 'white', textDecoration: 'none' }}>
                        Настройки
                    </Link>

                    <div style={{ position: 'relative' }}>
                        <Link to="/?favorites=true" style={{ color: 'white', textDecoration: 'none' }}>
                            ❤️
                            {favorites.length > 0 && (
                                <span className="badge">{favorites.length}</span>
                            )}
                        </Link>
                    </div>

                    <button onClick={toggleTheme} style={{ background: 'none', border: '1px solid white' }}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;