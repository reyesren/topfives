import React from "react";
import { Card } from "react-bootstrap";

const UserCard = (props) => {
  return (
    <Card id="user-card">
      <Card.Body>
        <Card.Title>{props.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.firstName} {props.lastName}
        </Card.Subtitle>
        <Card.Link href={`/user/${props.id}`}>
          Visit {props.username}'s page <i className="fas fa-arrow-right"></i>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
