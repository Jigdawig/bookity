import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { LoginContext } from '../App';
import { SearchBar } from '../components/SearchBar';
import { Books } from '../components/Book/Books';
import { searchBooks } from '../utils/BooksApi';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [loggedIn, _] = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSearch = (_searchText) => {
    let searchText = _searchText.replace(/[^\w\s]/g, '').trim();

    // Ignore search with no alphanumeric characters
    if(searchText.length === 0) {
      console.log('Empty Search!');
    } else {
      fetchBooks(searchText);
    }
  };

  

  const fetchBooks = async(param) => {
    setLoading(true);

    try {
      const data = await searchBooks(param);
      console.log('data:', data);
      setBooks(data)
      setLoading(false);
    } catch(err) {
      console.log('Oh no an error occured while fetching:', err);
      setLoading(false);
    }
  }

  // Load API data
  useEffect(() => {
    fetchBooks('Stormlight Archive')  
    }, []);
  
    // useEffect(() => {
    //   if (books.length > 0) setLoading(true);
    // }, [books]);
  
    // // Transform data for rendering
    // useEffect(() => {
    //   if (loading) {}
    // }, [loading]);

    useEffect(() => {
      if (!loggedIn) {
        navigate('/login');
      }
    }, [loggedIn]);
  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      { loading && <Spinner /> }
      { !loading && books.length > 0 && <Books books={books}/> }
    </>
  );
}

export default Dashboard;