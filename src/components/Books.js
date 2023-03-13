import React from "react";
import Book from "./Book";
import noCoverImg from "../images/no-cover.jpg";

export const Books = ({ books }) => {
  const title =
    books.length > 1
      ? "Found a few books that match your search"
      : "Found a book that matches your search";
  const booksWithCovers = books.map((book) => {
    return {
      ...book,
      id: book.id.replace("/works/", ""),
      coverImg: book.coverId
        ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
        : noCoverImg,
    };
  });

  return (
    <section className="books-section">
      <div className="container">
        <div className="books-section-title">
          <h2>{title}</h2>
        </div>
        <div className="books-content grid">
          {booksWithCovers.slice(0, 5).map((book, index) => {
            return <Book key={index} book={book} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Books;
