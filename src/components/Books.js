import React from "react";
import Book from "./Book";
import noCoverImg from "../images/no-cover.jpg";

export const Books = ({ books }) => {
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
        <br />
        <div className="books-content grid">
          {booksWithCovers.slice(0, 20).map((book, index) => {
            return (
                <Book key={book.id} book={book} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Books;
