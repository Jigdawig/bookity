import React from "react";
import { Container } from "react-bootstrap";

export const Book = ({ book }) => {
  console.log('book:', book)
  return (
    <Container>

    <div className="book-cover">
      <div className="book-cover-img">
        <img classname="test" src={book.coverImg} alt={`${book.title} cover`} />
      </div>
      <div className="book-info text-center">
        <div className="book-info title">
          <span>{book.title}</span>
        </div>

        <div className="book-info author">
          <span className="text-capitalize">Author: </span>
          <span>{book.author.join(", ")}</span>
        </div>

        <div className="book-info publish-year">
          <span className="text-capitalize">Published: </span>
          <span>{book.publishYear}</span>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default Book;
