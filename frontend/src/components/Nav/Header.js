import React, { useState, Fragment } from "react";
import { Nav, Image, Collapse, Navbar } from "react-bootstrap";
import Login from "../Auth/Login/Login";
import Signup from "../Auth/Signup/Signup";
import Logout from "../Auth/Logout/Logout";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";

const Header = (props) => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [expand, setExpand] = useState(false);

  const openSignupHandler = () => {
    setOpenSignup(true);
  };
  const closeSignupHandler = () => {
    setOpenSignup(false);
  };

  const openLoginHandler = () => {
    setOpenLogin(true);
  };
  const closeLoginHandler = () => {
    setOpenLogin(false);
  };

  const openLogoutHandler = () => {
    setOpenLogout(true);
  };
  const closeLogoutHandler = (event, toLogout) => {
    if (toLogout) {
      setOpenLogout(false);
      onAuthLogout();
    } else {
      setOpenLogout(false);
    }
  };

  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => {
    return state.auth.loggedIn;
  });

  const userId = useSelector((state) => {
    if (!loggedIn) return null;
    return state.auth.userInfo._id;
  });

  console.log(userId);

  const onAuthLogout = () => {
    dispatch(actions.logout());
  };
  const expandHandler = () => {
    setExpand((prevState) => !prevState);
  };

  const signupModal = openSignup ? (
    <Signup show={openSignup} closeHandler={closeSignupHandler}></Signup>
  ) : null;
  const loginModal = openLogin ? (
    <Login show={openLogin} closeHandler={closeLoginHandler}></Login>
  ) : null;
  const logoutModal = openLogout ? (
    <Logout show={openLogout} closeHandler={closeLogoutHandler}></Logout>
  ) : null;

  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <Image className="nav-brand" src="/images/logo-title.png"></Image>
        </Navbar.Brand>
        <Nav.Link id="nav-link__create-sm" eventKey="link-5">
          Create List
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <Image
            className="nav-profile__pic"
            src="https://codepen-pictures.s3.us-east-2.amazonaws.com/Expanded+Cards/michael+henry.png"
            alt="profile icon"
          />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link className="nav-logo" href="/">
              <Image
                className="nav-home__image"
                src="/images/logo-title.png"
              ></Image>
            </Nav.Link>
            {loggedIn ? (
              <>
                <Nav.Link eventKey="link-1" href="/">
                  Home
                </Nav.Link>
                <Nav.Link eventKey="link-2">Subscribers</Nav.Link>
                <Nav.Link eventKey="link-3">Notifications</Nav.Link>
                <Nav.Link eventKey="link-4" href={`/user/${userId}`}>
                  Profile
                </Nav.Link>
                <Nav.Link id="nav-link__create-lg" eventKey="link-5">
                  <i className="fas fa-plus"></i> Create List
                </Nav.Link>
                <Nav.Item id="nav-profile__settings-sm">
                  <Nav.Link eventKey="link-8">Settings</Nav.Link>
                  <Nav.Item>Logout</Nav.Item>
                </Nav.Item>
                <Nav.Item className={`nav-profile`}>
                  <Collapse in={expand}>
                    <Nav.Item className={`nav-profile__auth`}>
                      <Nav.Link id="nav-profile__settings" eventKey="link-7">
                        Settings
                      </Nav.Link>
                      <Nav.Item
                        id="profile-logout__btn"
                        onClick={openLogoutHandler}
                      >
                        Log Out
                      </Nav.Item>
                    </Nav.Item>
                  </Collapse>
                  <button
                    className="sidebar-footer__btn"
                    onClick={expandHandler}
                  >
                    <span>
                      <Image
                        src="https://codepen-pictures.s3.us-east-2.amazonaws.com/Expanded+Cards/michael+henry.png"
                        alt="profile icon"
                        className="nav-profile__pic"
                      ></Image>
                    </span>
                    <span className="nav-profile__name">
                      <p>Cha1nman</p>
                      <p>Michael Henry</p>
                    </span>
                  </button>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item className="logged-out__nav-container">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Item
                  className="logged-out__options"
                  id="logged-out__options-1"
                  onClick={openLoginHandler}
                >
                  Login
                </Nav.Item>
                <Nav.Item
                  className="logged-out__options"
                  id="logged-out__options-2"
                  onClick={openSignupHandler}
                >
                  Signup
                </Nav.Item>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {signupModal}
      {loginModal}
      {logoutModal}
    </Fragment>
  );
};

export default Header;
