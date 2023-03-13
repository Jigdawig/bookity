import React from "react";
import Book from "./Book";
import noCoverImg from "../images/no-cover.jpg";

export const Books = ({ books, title }) => {
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
        <br />
        <div className="books-content grid">
          {booksWithCovers.slice(0, 5).map((book, index) => {
            return (
              <>
                <Book key={index} book={book} /> <br />
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Books;
