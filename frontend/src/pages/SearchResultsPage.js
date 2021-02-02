import React from "react";
import { Container, Col, Image, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import UserCard from "../components/UserCard";
import ListCard from "../components/ListCard";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const SearchResultsPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const searchResults = useSelector((state) => {
    return state.searchUsersResults;
  });
  const searchListResults = useSelector((state) => {
    return state.searchListsResults;
  });
  const { users, loading, error } = searchResults;
  const { lists, loading: listLoading, error: listError } = searchListResults;

  return (
    <Container className="container">
      <Row className="search-row">
        <h3>Search Results: Books</h3>
        <span id="search-row__search">
          <SearchBar />
        </span>
      </Row>
      <Container className="container search-container">
        <Col className="search-results__col" lg={7}>
          {path === "/search/list" &&
            lists.map((list, index) => (
              <ListCard
                key={index}
                list={list}
                listTitle={list.listTitle}
                listType={list.listType}
                creator={list.creator}
              />
            ))}
          {path === "/search/user" &&
            users.map((user) => (
              <UserCard
                key={user.username}
                username={user.username}
                firstName={user.firstName}
                lastName={user.lastName}
                id={user._id}
              />
            ))}
        </Col>
        <Col className="search-pages__col-right" lg={5}>
          <Image id="search-page__logo" src="/images/logo.png" />
          <Row id="search-page__paginate-row">
            <Link to="/">Prev Page</Link>
            <Link to="/">Next Page</Link>
          </Row>
        </Col>
      </Container>
    </Container>
  );
};

export default SearchResultsPage;

/*

          {users.map((user) => (
            <ListCard
              key={user.username}
              username={user.username}
              firstName={user.firstName}
              lastName={user.lastName}
              id={user._id}
            />
          ))}

          */
