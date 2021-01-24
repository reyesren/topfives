import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import lists from "../data/listData";
import { Container, Row, Col, Image, Dropdown, Button } from "react-bootstrap";
import ListItems from "../components/ListItems";
import ListItemDetails from "../components/ListItemDetails";
import DisplaySpinner from "../components/DisplaySpinner/DisplaySpinner";
import EditProfile from "../components/EditProfile/EditProfile";
import { getProfile } from "../store/actions/profile";

const UserPage = (props) => {
  const dispatch = useDispatch();
  const [localUsername, setLocalUsername] = useState("");

  const profile = useSelector((state) => {
    return state.profile;
  });

  const loggedIn = useSelector((state) => {
    return state.auth.loggedIn;
  });
  const { firstName, lastName, username, bio, loading } = profile;

  console.log(props);
  const userId = props.match.params.id;

  const [selectedList, setSelectedList] = useState("");
  const [showFullList, setShowFullList] = useState(false);
  const [listDetails, setListDetails] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [dropdownEnabled, setDropdownEnabled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

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
    setSelectedList(`${username} TopFives Lists`);
  };

  const showItemDetailsHandler = () => {
    setShowFullList(false);
    setShowItemDetails(true);
  };

  const goBackHandler = () => {
    setShowItemDetails(false);
    setShowFullList(true);
  };

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    console.log(username);
    setLocalUsername(username);
    setSelectedList(`${username}'s TopFives List`);
  }, [username]);

  const toggleEditProfileHandler = () => {
    setShowEditProfile(!showEditProfile);
  };

  // const closeEditProfileHandler = () => {
  //   setShowEditProfile(false);
  // };
  const editProfileModal = showEditProfile ? (
    <EditProfile
      show={showEditProfile}
      closeHandler={toggleEditProfileHandler}
    ></EditProfile>
  ) : null;

  return (
    <Container className="user-page__container">
      {loading && <DisplaySpinner />}
      {!loading && (
        <>
          <Row className="user-info__row">
            <Col id="user-info__col-1" lg={6} md={6} sm={6} xs={12}>
              <Image
                className="profile-picture"
                src="/images/michael.jpeg"
              ></Image>
              <Button
                className="edit-profile__btn"
                onClick={toggleEditProfileHandler}
              >
                <h3>Edit Profile</h3>
              </Button>
            </Col>
            <Col id="user-info__col-2" lg={6} md={6} sm={6} xs={12}>
              <h1>{`${firstName} ${lastName}`}</h1>
              <h2>aka {username}</h2>
              <p>{bio}</p>
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
                <ListItemDetails
                  item={itemDetails}
                  goBackHandler={goBackHandler}
                />
              )}
            </Row>
          </Row>
          {editProfileModal}
        </>
      )}
    </Container>
  );
};

export default UserPage;
