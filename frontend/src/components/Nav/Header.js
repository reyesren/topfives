import React, { useState, Fragment } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import Login from "../Auth/Login/Login";
import Signup from "../Auth/Signup/Signup";
import { connect } from "react-redux";

const Header = (props) => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const openSignupHandler = () => {
    setOpenSignup(true);
  };
  const closeSignupHandler = () => {
    setOpenSignup(false);
  };
  const openLoginHandler = () => {
    console.log(openLogin);
    setOpenLogin(true);
  };

  const closeLoginHandler = () => {
    console.log(openLogin);
    setOpenLogin(false);
  };

  const signupModal = openSignup ? (
    <Signup show={openSignup} closeHandler={closeSignupHandler}></Signup>
  ) : null;
  const loginModal = openLogin ? (
    <Login show={openLogin} closeHandler={closeLoginHandler}></Login>
  ) : null;
  return (
    <Fragment>
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <Image
            className="nav-home__image"
            src="/images/logo-title.png"
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {props.loggedIn ? (
            <Nav className="nav-loggedIn">
              <Nav.Link id="nav-link__create" href="#create">
                <i class="fas fa-plus"></i> Create List
              </Nav.Link>
              <Form inline>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="nav-search"
                  />
                  <InputGroup.Append>
                    <Button className="nav-search__btn" variant="light">
                      <i class="fas fa-search"></i>
                    </Button>
                  </InputGroup.Append>
                  <InputGroup.Append>
                    <Form.Group controlId="userOrList2">
                      <Form.Control as="select" custom>
                        <option>User</option>
                        <option>List</option>
                      </Form.Control>
                    </Form.Group>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
              <NavDropdown title="Cha1nman" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Subscriber List
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="nav-loggedOut">
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={openLoginHandler}>
                  Log In
                </NavDropdown.Item>
                <NavDropdown.Item onClick={openSignupHandler}>
                  Sign Up
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
      {signupModal}
      {loginModal}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(Header);
