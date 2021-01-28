import React, { useState, useEffect } from "react";
import { Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUsers } from "../store/actions/profile";
import { getLists } from "../store/actions/list";
import {
  LIST_SEARCH_RESET,
  USER_SEARCH_RESET,
} from "../store/actions/actionTypes";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchOption, setSearchOption] = useState("User");
  const [searchText, setSearchText] = useState("");

  const searchOptionHandler = (e) => {
    setSearchOption(e.target.value);
  };
  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchOption === "User") {
      dispatch(getUsers(searchText));
    } else {
      dispatch(getLists(searchText));
    }
  };
  useEffect(() => {
    return () => {
      dispatch({ type: USER_SEARCH_RESET });
      dispatch({ type: LIST_SEARCH_RESET });
    };
  });
  return (
    <Row>
      <Form onSubmit={onSubmitHandler} className="user-search py-3">
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
