import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ handleSearch }) => {
  const searchText = useRef('');

  return (
    <div className="search-form-container">
      <div className="search-container">
        <div className="search-form-content">
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchText?.current?.value);
            }}
          >
            <div className="search-form-text">
              <input
                type="text"
                className="form-control"
                placeholder="The Lord of the Rings ..."
                ref={searchText}
              />
              <button
                type="submit"
                className="search-icon"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch(searchText?.current?.value);
                }}
              >
                <FaSearch size={25} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
