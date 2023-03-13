import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { ThemeContext } from "../App";

export const Book = ({ book }) => {
  const [themeContext] = useContext(ThemeContext);

  return (
    <Card
      bg={themeContext}
      text={themeContext === "light" ? "dark" : "white"}
      style={{ width: "18rem" }}
    >
      <Card.Img variant="top" src={book.coverImg} alt={`${book.title} cover`} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <span>Author: </span>
          <span>{book.author.join(", ")}</span>
        </Card.Text>
        <Card.Text>
          <span>Published: </span>
          <span>{book.publishYear}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Book;
