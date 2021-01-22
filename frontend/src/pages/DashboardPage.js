import React from "react";
import { Container, Row, Col, Image, Form } from "react-bootstrap";

const DashboardPage = () => {
  return (
    <Container className="dashboard-container" fluid>
      <Row>
        <Col>
          <Image
            className="dashboard-logo"
            src="/images/logo-title.png"
          ></Image>
        </Col>
      </Row>
      <Row>
        <Form className="user-search py-3">
          <Form.Group controlId="Search">
            <Form.Control type="text" placeholder="Search" />
          </Form.Group>
          <Form.Group controlId="userOrList">
            <Form.Control as="select" custom>
              <option>User</option>
              <option>List</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default DashboardPage;
