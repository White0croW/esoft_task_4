import BookCard from './BookCard';

function BookList({ books }) {
    return (
        <div className="grid">
            {books.length > 0 ? (
                books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))
            ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                    <h3>Книги не найдены</h3>
                    <p>Попробуйте изменить критерии поиска</p>
                </div>
            )}
        </div>
    );
}

export default BookList;