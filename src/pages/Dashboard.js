import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { RequireLogin } from "../components/RequireLogin";
import { SearchBar } from "../components/SearchBar";
import { Books } from "../components/Books";
import { searchBooks } from "../utils/BooksApi";

const Dashboard = () => {
  const [loading, setLoading] = useState(null);
  const [books, setBooks] = useState([]);
  const searchTitle = books.length > 0 ? "Search Result(s):" : "No matching books found";

  const handleSearch = (_searchText) => {
    let searchText = _searchText.replace(/[^\w\s]/g, "").trim();

    // Ignore search with no alphanumeric characters
    if (searchText.length === 0) {
      console.log("Empty Search!");
      setBooks([]);
    } else {
      fetchBooks(searchText);
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

  return (
    <RequireLogin>
      <h2 className="header-title text-capitalize">
        find the book of your dreams today!
      </h2>
      <br />
      <SearchBar handleSearch={handleSearch} />
      <br />
      {loading === false && <h3 className="search-title">{searchTitle}</h3>}
      {loading && <Spinner className="loading-spinner" />}
      {!loading && books.length > 0 && <Books books={books} />}
    </RequireLogin>
  );
};

export default Dashboard;
