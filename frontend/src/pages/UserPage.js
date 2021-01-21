import React, { useState } from "react";
import lists from "../data/listData";
import { Container, Row, Col, Image, Dropdown, Button } from "react-bootstrap";
import ListItems from "../components/ListItems";
import ListItemDetails from "../components/ListItemDetails";

const UserPage = (props) => {
  const [selectedList, setSelectedList] = useState("Cha1nman's TopFives List");
  const [showFullList, setShowFullList] = useState(false);
  const [listDetails, setListDetails] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [dropdownEnabled, setDropdownEnabled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const onSelectHandler = (e) => {
    setDropdownEnabled(false);
    setSelectedList(e);
    setShowFullList(true);
    let details = lists.find((list) => list.listTitle === e);
    setListDetails(details.listItems);
  };

  const enableDropdownHandler = (e) => {
    setShowFullList(false);
    setDropdownEnabled(true);
    setShowMenu(true);
    setSelectedList("TopFives List");
  };

  const showItemDetailsHandler = () => {
    setShowFullList(false);
    setShowItemDetails(true);
  };

  const goBackHandler = () => {
    setShowItemDetails(false);
    setShowFullList(true);
  };

  return (
    <Container className="user-page__container">
      <Row className="user-info__row">
        <Col id="user-info__col-1" lg={6}>
          <Image className="profile-picture" src="/images/michael.jpeg"></Image>
          <Button className="edit-profile__btn">
            <h3>Edit Profile</h3>
          </Button>
        </Col>
        <Col id="user-info__col-2" lg={6}>
          <h1>Michael Henry</h1>
          <h2>aka Cha1nman</h2>
          <p>
            I am a McMaster University Alumni who graduated from the Computer
            Engineering program. During my tenure at McMaster, my interest in
            web development grew and I have continued to pursue this area of
            development.
          </p>
        </Col>
      </Row>
      <Row className="user-list__row">
        {!dropdownEnabled && <h1 id="list-title">{selectedList}</h1>}
        {dropdownEnabled && (
          <Dropdown
            className="list-dropdown"
            onSelect={onSelectHandler}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <Dropdown.Toggle id="dropdown-basic">
              {selectedList}
            </Dropdown.Toggle>
            <Dropdown.Menu show={showMenu} flip={false}>
              {lists.map((list) => (
                <Dropdown.Item
                  eventKey={list.listTitle}
                  as="button"
                  key={list.listTitle}
                >
                  <div className="list-item__row">
                    <h1>{list.listTitle}</h1>
                    <h3>Type: {list.listType}</h3>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
        <Row className="full-list__row">
          {showFullList &&
            listDetails.map((entry, index) => (
              <Row key={entry.rank} className="list-row">
                <Button
                  onClick={() => {
                    setItemDetails({ ...entry });
                    showItemDetailsHandler();
                  }}
                  className="list-items__details-btn"
                >
                  <ListItems
                    key={entry.rank}
                    name={entry.name}
                    rank={entry.rank}
                    end={index === listDetails.length - 1 ? true : false}
                    enableDropdownHandler={enableDropdownHandler}
                  />
                </Button>
                {index === listDetails.length - 1 && (
                  <Button
                    className="see-all-lists"
                    onClick={enableDropdownHandler}
                    id="go-back"
                  >
                    <h3>
                      <i className="fas fa-arrow-left"></i> See All Lists
                    </h3>
                  </Button>
                )}
              </Row>
            ))}
          {showItemDetails && (
            <ListItemDetails item={itemDetails} goBackHandler={goBackHandler} />
          )}
        </Row>
      </Row>
    </Container>
  );
};

export default UserPage;
