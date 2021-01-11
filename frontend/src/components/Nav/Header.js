import React, { useState } from "react";
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

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <>
      <Navbar expand="lg">
        <Navbar.Brand href="#home">
          <Image
            className="nav-home__image"
            src="/images/logo-title.png"
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {loggedIn ? (
            <Nav>
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
            <Nav className="ml-auto">
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Log In</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Sign Up</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
      )
    </>
  );
};

export default Header;
