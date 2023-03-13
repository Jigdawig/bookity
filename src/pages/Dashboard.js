import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { LoginContext } from "../App";
import { SearchBar } from "../components/SearchBar";
import { Books } from "../components/Books";
import { searchBooks } from "../utils/BooksApi";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [loggedIn, _] = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSearch = (_searchText) => {
    let searchText = _searchText.replace(/[^\w\s]/g, "").trim();

    // Ignore search with no alphanumeric characters
    if (searchText.length === 0) {
      console.log("Empty Search!");
      setSearchTitle("No matching books found");
    } else {
      fetchBooks(searchText);

      setSearchTitle(
        books.length > 0 ? "Here's what we found" : "No matching books found"
      );
    }
  };

  const fetchBooks = async (param) => {
    setLoading(true);

    try {
      const data = await searchBooks(param);

      setBooks(data);
      setLoading(false);
    } catch (err) {
      console.log("Oh no an error occured while fetching:", err);
      setLoading(false);
    }
  };

  // Load some arbitrary data
  useEffect(() => {
    fetchBooks("the lord of the rings");
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);
  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <br />
      {loading && <Spinner />}
      {!loading && books.length > 0 && (
        <Books books={books} title={searchTitle} />
      )}
    </>
  );
};

export default Dashboard;
