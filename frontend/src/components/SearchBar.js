import React, { useState } from "react";
import { Row, Form } from "react-bootstrap";

const SearchBar = () => {
  const [searchOption, setSearchOption] = useState("User");
  const [searchText, setSearchText] = useState("");

  const searchOptionHandler = (e) => {
    setSearchOption(e.target.value);
  };
  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };
  return (
    <Row>
      <Form className="user-search py-3">
        <Form.Group controlId="Search">
          <Form.Control
            value={searchText}
            onChange={onChangeHandler}
            type="text"
            placeholder="Search"
          />
        </Form.Group>
        <Form.Group controlId="userOrList">
          <Form.Control as="select" custom onChange={searchOptionHandler}>
            <option>User</option>
            <option>List</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </Row>
  );
};

export default SearchBar;
