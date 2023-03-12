import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { getBooks } from '../utils/BooksApi';

function Dashboard() {
  // Initializing states
  const [fetchComplete, setFetchComplete] = useState(false);
  const [books, setBooks] = useState([]);

  const [loggedIn, _] = useContext(LoginContext);
  const navigate = useNavigate();

    // Load API data
    // useEffect(() => {
    //   //second
    //   console.log('second:', getBooks())

    //   getBooks().then((booksRes) => {
    //     console.log('booksRes:', booksRes)
    //     setBooks(booksRes);
    //   });

      
    // }, []);
  
    useEffect(() => {
      if (books.length > 0) setFetchComplete(true);
    }, [books]);
  
    // Transform data for rendering
    useEffect(() => {
      if (fetchComplete) {}
    }, [fetchComplete]);

    useEffect(() => {
      if (!loggedIn) {
        navigate("/login");
      }
    }, [loggedIn]);
  return (
    <>
      <h1>Hey from Dashboard</h1>
      <p>This is your awesome Dashboard subtitle</p>
    </>
  );
}

export default Dashboard;