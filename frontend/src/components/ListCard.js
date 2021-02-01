import React from "react";
import { Card } from "react-bootstrap";

const ListCard = (props) => {
  return (
    <div>
      <Card id="user-card" style={{ width: "15rem" }}>
        <Card.Body>
          <Card.Title>Cha1nman</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Michael Henry
          </Card.Subtitle>
          <Card.Link href="#">
            Visit Cha1nman's page <i className="fas fa-arrow-right"></i>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ListCard;
