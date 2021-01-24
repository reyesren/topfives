import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";

const ListItemDetails = (props) => {
  return (
    <Row className="details-row">
      {props.item.resourceType === "quote" && (
        <>
          <Row className="details-name">
            <h1>{props.item.name}</h1>
          </Row>
          <Row className="details-body">
            <Col lg={5}>
              <p id="resource-quote">{props.item.resource}</p>
              <p id="resource-origin">~ {props.item.resourceOrigin}</p>
            </Col>
            <Col id="resource-quote__description" lg={7}>
              {props.item.description}
            </Col>
          </Row>
          <Row className="details-footer">
            <Button className="back-to-list" onClick={props.goBackHandler}>
              <h3>
                <i className="fas fa-arrow-left"></i>Go back to list
              </h3>
            </Button>
            <h1 className="details-rank">{props.item.rank}</h1>
          </Row>
        </>
      )}
      {props.item.resourceType === "url" && (
        <>
          <Row className="details-name">
            <h1>{props.item.name}</h1>
          </Row>
          <Row className="details-body">
            <Col id="resource-url__description" lg={7}>
              {props.item.description}
            </Col>
            <Col lg={5}>
              <p id="resource-link__header">Check this out!</p>
              <a id="resource-link" href={props.item.resource}>
                {props.item.resource}
              </a>
              <br></br>
            </Col>
          </Row>
          <Row className="details-footer">
            <Button className="back-to-list" onClick={props.goBackHandler}>
              <h3>
                <i className="fas fa-arrow-left"></i>Go back to list
              </h3>
            </Button>
            <h1 className="details-rank">{props.item.rank}</h1>
          </Row>
        </>
      )}
      {props.item.resourceType === "image" && (
        <>
          <Row className="details-header-plus-body">
            <Col id="resource-image__column" lg={5}>
              <Image
                className="details-resource__image"
                src={props.item.resource}
                alt="props.item resource"
              />
            </Col>
            <Col lg={7} className="title-and-desc">
              <h1>{props.item.name}</h1>
              <p>{props.item.description}</p>
            </Col>
          </Row>
          <Row className="details-footer">
            <Button className="back-to-list" onClick={props.goBackHandler}>
              <h3>
                <i className="fas fa-arrow-left"></i>Go back to list
              </h3>
            </Button>
            <h1 className="details-rank">{props.item.rank}</h1>
          </Row>
        </>
      )}
    </Row>
  );
};

export default ListItemDetails;

/*

*/

/*


*/
