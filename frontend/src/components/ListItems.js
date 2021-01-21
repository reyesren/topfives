import React from "react";
import { Col } from "react-bootstrap";

const ListItems = (props) => {
  return (
    <>
      <Col lg={4} id="item-rank">
        {props.rank}
      </Col>
      <Col lg={8} id="item-name">
        {props.name}
      </Col>
    </>
  );
};

export default ListItems;
