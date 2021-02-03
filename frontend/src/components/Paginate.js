import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, type, keyword = "" }) => {
  console.log(pages, page);
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Link key={x + 1} to={`/search/${type}/${keyword}/page/${x + 1}`}>
            <Pagination.Item
              href={`/search/${type}/${keyword}/page/${x + 1}`}
              active={x + 1 === page}
            >
              {x + 1}
            </Pagination.Item>
          </Link>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
