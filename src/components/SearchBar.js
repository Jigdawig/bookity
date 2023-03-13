import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";

export const SearchBar = ({ handleSearch }) => {
  const searchText = useRef("");

  return (
    <div className="search-form-container">
      <div className="search-container">
        <div className="search-form-content flex flex-sb bg-white">
          <Form
            className="search-form d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchText?.current?.value);
            }}
          >
            <Form.Control
              type="search"
              className="me-2"
              aria-label="Search"
              placeholder="The Lord of the Rings ..."
              ref={searchText}
            />
            <Button
              className="search-icon flex flex-c"
              onClick={(e) => {
                e.preventDefault();
                handleSearch(searchText?.current?.value);
              }}
            >
              <FaSearch size={35} />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
