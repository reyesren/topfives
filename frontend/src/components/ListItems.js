import React from "react";
import { Col } from "react-bootstrap";

const ListItems = (props) => {
  return (
    <>
      <Col lg={2} xs={3} id="item-rank">
        {props.rank}
      </Col>
      <Col lg={10} xs={9} id="item-name">
        {props.name}
      </Col>
    </>
  );
};

export default ListItems;
