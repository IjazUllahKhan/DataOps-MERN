import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = ({
  nextHandler,
  prevHandler,
  setPage,
  totalPages,
  page,
}) => {
  return (
    <>
      <div className="pagination_div d-flex justify-content-end mx-5">
        <Pagination>
          <Pagination.Prev onClick={prevHandler} />
          {Array(totalPages)
            .fill(null)
            .map((element, index) => {
              return (
                <Pagination.Item
                  onClick={() => setPage(index + 1)}
                  active={page == index + 1 ? true : false}
                >
                  {index + 1}
                </Pagination.Item>
              );
            })}

          <Pagination.Next onClick={nextHandler} />
        </Pagination>
      </div>
    </>
  );
};

export default Paginations;
