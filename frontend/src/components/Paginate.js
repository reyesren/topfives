import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, type, keyword = "" }) => {
  console.log(pages, page);
  return (
    pages > 1 && (
      <Pagination>
        {page >= 3 && (
          <>
            <Pagination.Item href={`/search/${type}/${keyword}/page/1`}>
              <p>{`<<`}</p>
            </Pagination.Item>
          </>
        )}
        {page > 1 && (
          <Pagination.Item href={`/search/${type}/${keyword}/page/${page - 1}`}>
            {page - 1}
          </Pagination.Item>
        )}
        {[...Array(2).keys()].map(
          (x) =>
            page + x <= pages && (
              <Pagination.Item
                key={x + 1}
                href={`/search/${type}/${keyword}/page/${page + x}`}
                active={page + x === page}
              >
                {page + x}
              </Pagination.Item>
            )
        )}
        {page <= pages - 2 && (
          <>
            <span id="pagination-dots">{`...`}</span>
            <Pagination.Item href={`/search/${type}/${keyword}/page/${pages}`}>
              {pages}
            </Pagination.Item>
          </>
        )}
      </Pagination>
    )
  );
};

export default Paginate;

/* 
<Pagination>
{[...Array(page > pages - 6 ? pages - page : pages).keys()].map((x) => (
  <Link key={x + 1} to={`/search/${type}/${keyword}/page/${page + x}`}>
    <Pagination.Item
      href={`/search/${type}/${keyword}/page/${page + x}`}
      active={page + x === page}
    >
      {page + x}
    </Pagination.Item>
  </Link>
))}
</Pagination> */
