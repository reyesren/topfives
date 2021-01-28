import React from "react";
import SearchBar from "../components/SearchBar";
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
      <SearchBar />
    </Container>
  );
};

export default DashboardPage;
