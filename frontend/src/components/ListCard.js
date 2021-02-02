import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showList } from "../store/actions/list";
import { useHistory } from "react-router-dom";

const ListCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onClick = () => {
    dispatch(showList(props.list));
    history.push(`/user/${props.creator}`);
  };
  return (
    <div>
      <Card id="user-card" style={{ width: "15rem" }}>
        <Card.Body>
          <Card.Title>{props.listTitle}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.listType}
          </Card.Subtitle>
          <Card.Link onClick={onClick}>
            See More Details <i className="fas fa-arrow-right"></i>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ListCard;
