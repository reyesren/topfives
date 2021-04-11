import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Image, Dropdown, Button } from "react-bootstrap";
import ListItems from "../components/ListItems";
import ListItemDetails from "../components/ListItemDetails";
import DisplaySpinner from "../components/DisplaySpinner/DisplaySpinner";
import EditProfile from "../components/EditProfile/EditProfile";
import { getProfile } from "../store/actions/profile";
import { getListEntries } from "../store/actions/listEntry";
import { LIST_RESET } from "../store/actions/actionTypes";
import EditList from "../components/EditList";
import SocketContext from "../context/socketContext";

const UserPage = (props) => {
  const socket = useContext(SocketContext);
  const [selectedList, setSelectedList] = useState("");
  const [selectedListType, setSelectedListType] = useState("");
  const [showFullList, setShowFullList] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [dropdownEnabled, setDropdownEnabled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [showEditListModal, setShowEditListModal] = useState(false);
  const [listId, setListId] = useState("");

  const userId = props.match.params.id;

  const dispatch = useDispatch();

  const profile = useSelector((state) => {
    return state.profile;
  });

  const auth = useSelector((state) => {
    return state.auth;
  });

  const { loggedIn, userInfo } = auth;

  const { firstName, lastName, username, bio, loading } = profile;
  const listEntries = useSelector((state) => {
    return state.listEntries;
  });

  const { entries } = listEntries;

  const preloadedList = useSelector((state) => {
    return state.showList.list;
  });

  const onSelectHandler = useCallback(
    (e) => {
      setDropdownEnabled(false);
      setSelectedList(e);
      setShowFullList(true);
      console.log(e);
      let details = profile.lists.find((list) => list.listTitle === e);
      setSelectedListType(details.listType);
      console.log(details);
      setListId(details._id);

      dispatch(getListEntries(details._id));

      //setListDetails(details.listItems);
    },
    [dispatch, profile.lists]
  );

  const enableDropdownHandler = (e) => {
    dispatch({ type: LIST_RESET });
    setShowFullList(false);
    setDropdownEnabled(true);
    setShowMenu(true);

    setSelectedList(`${username} TopFives Lists`);
  };

  const showItemDetailsHandler = () => {
    setShowFullList(false);
    setShowItemDetails(true);
    dispatch({ type: LIST_RESET });
  };

  const goBackHandler = () => {
    setShowItemDetails(false);
    setShowFullList(true);
  };

  const toggleEditProfileHandler = () => {
    setShowEditProfile(!showEditProfile);
  };

  const editListHandler = () => {
    setShowEditListModal((prev) => !prev);
  };

  const onFollowHandler = () => {
    const user = socket.users.find((user) => user.username === username);
    console.log(user);
    socket.socket.emit("follow", {
      followed: username,
      follower: userInfo.username,
      to: user.userID,
      from: socket.socket.userID,
    });
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
  const editListModal = showEditListModal ? (
    <EditList
      show={showEditListModal}
      closeHandler={editListHandler}
      listTitle={selectedList}
      listType={selectedListType}
      entries={entries}
      listId={listId}
    ></EditList>
  ) : null;

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setSelectedList(`${username}'s TopFives List`);
  }, [username]);

  useEffect(() => {
    return () => {
      dispatch({ type: LIST_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    if (preloadedList.listTitle && profile.lists.length !== 0) {
      console.log(preloadedList);
      onSelectHandler(preloadedList.listTitle);
    }
  }, [preloadedList, onSelectHandler, profile]);

  useEffect(() => {
    if (loggedIn) {
      // console.log(userInfo._id, userId);
      if (userInfo._id === userId) {
        setIsMyProfile(true);
      } else {
        setIsMyProfile(false);
      }
    }
  }, [loggedIn, userId]);

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
              <Button onClick={onFollowHandler}>Follow</Button>
            </Col>
            <Col id="user-info__col-2" lg={6} md={6} sm={6} xs={12}>
              <h1>{`${firstName} ${lastName}`}</h1>
              <h2>aka {username}</h2>
              <p>{bio}</p>
            </Col>
          </Row>
          <Row className="user-list__row">
            {(!dropdownEnabled || preloadedList.listTitle) && (
              <Row className="listheader--row">
                <h1 id="list-title">{selectedList} </h1>
              </Row>
            )}
            {profile.lists.length > 0 ? (
              dropdownEnabled &&
              !preloadedList.listTitle && (
                <Dropdown
                  className="list-dropdown"
                  onSelect={onSelectHandler}
                  onClick={() => setShowMenu((prev) => !prev)}
                  show={showMenu}
                >
                  <Dropdown.Toggle id="dropdown-basic">
                    {selectedList}
                  </Dropdown.Toggle>
                  <Dropdown.Menu show={showMenu} flip={false}>
                    {profile.lists.map((list) => (
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
              )
            ) : (
              <h2>When {username} adds a list, it will appear here.</h2>
            )}
            <Row className="full-list__row">
              {(showFullList || preloadedList.listTitle) &&
                (entries.length > 0 ? (
                  entries.map((entry, index) => (
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
                          end={index === entries.length - 1 ? true : false}
                          enableDropdownHandler={enableDropdownHandler}
                        />
                      </Button>
                      {index === entries.length - 1 && (
                        <React.Fragment>
                          <Button
                            className="see-all-lists"
                            onClick={enableDropdownHandler}
                            id="go-back__btn"
                          >
                            <h3>
                              <i className="fas fa-arrow-left"></i> See All
                              Lists
                            </h3>
                          </Button>
                          {userInfo._id === userId && (
                            <Button
                              className="editlist--btn"
                              onClick={editListHandler}
                            >
                              <h3>Edit</h3>
                            </Button>
                          )}
                        </React.Fragment>
                      )}
                    </Row>
                  ))
                ) : (
                  <>
                    <Row className="list-row empty-list__row">
                      <h2>This list has no entries</h2>
                    </Row>

                    <Button
                      className="see-all-lists"
                      onClick={enableDropdownHandler}
                      id="go-back__btn"
                    >
                      <h3>
                        <i className="fas fa-arrow-left"></i> See All Lists
                      </h3>
                    </Button>
                  </>
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
      {editListModal}
    </Container>
  );
};

export default UserPage;
