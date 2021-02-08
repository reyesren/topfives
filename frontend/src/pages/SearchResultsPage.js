import React, { useEffect } from "react";
import { Container, Col, Image, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import UserCard from "../components/UserCard";
import ListCard from "../components/ListCard";
import SearchBar from "../components/SearchBar";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/actions/profile";
import { getLists } from "../store/actions/list";

const SearchResultsPage = (props) => {
  const dispatch = useDispatch();
  const type = props.match.params.type || "";
  const pageNumber = props.match.params.pageNumber || 1;
  const name = props.match.params.name || "";
  console.log(type);

  const searchResults = useSelector((state) => {
    return state.searchUsersResults;
  });
  const searchListResults = useSelector((state) => {
    return state.searchListsResults;
  });
  const {
    users,
    loading,
    error,
    page: userspage,
    pages: userspages,
  } = searchResults;
  const {
    lists,
    loading: listLoading,
    error: listError,
    page: listspage,
    pages: listspages,
  } = searchListResults;

  useEffect(() => {
    if (type === "user") {
      dispatch(getUsers(name, pageNumber));
    }
    if (type === "list") {
      dispatch(getLists(name, pageNumber));
    }
  }, [dispatch, pageNumber, name, type]);

  return (
    <Container className="container">
      <Row className="search-row">
        <h3>Search Results: {name.substring(0, 10)}</h3>
        <span id="search-row__search">
          <SearchBar />
        </span>
      </Row>
      <Container className="container search-container">
        <Col className="search-results__col" md={7} lg={7}>
          {type === "list" && lists.length === 0 && (
            <h2 id="no-search__results">No Results Found</h2>
          )}
          {type === "list" &&
            lists.map((list, index) => (
              <ListCard
                key={index}
                list={list}
                listTitle={list.listTitle}
                listType={list.listType}
                creator={list.creator}
              />
            ))}
          {type === "user" && users.length === 0 && (
            <h2 id="no-search__results">No Results Found</h2>
          )}
          {type === "user" &&
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
        <Col className="search-pages__col-right" md={5} lg={5}>
          <Image id="search-page__logo" src="/images/logo.png" />
          <Row id="search-page__paginate-row">
            <Paginate
              pages={listspages}
              page={listspage}
              keyword={name ? name : ""}
              type={type}
            />
          </Row>
        </Col>
        <Row id="search-page__paginate-row__small">
          <Paginate
            pages={listspages}
            page={listspage}
            keyword={name ? name : ""}
            type={type}
          />
        </Row>
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
