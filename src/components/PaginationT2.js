import React, { useEffect, useState } from 'react';
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer,
  MDBBtn,
} from 'mdb-react-ui-kit';
import '../App.css';

function PaginationT2() {
  const [allTodos, setAllTodos] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(allTodos.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allTodos.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? 'active' : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const renderData = (allTodosData) => {
    return (
      <>
        {allTodosData.map((todo, index) => (
          <tr key={todo.id}>
            <td>{index + 1}</td>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
          </tr>
        ))}
      </>
    );
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => setAllTodos(json));
  }, []);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  return (
    <>
      <>
        <MDBContainer>
          <h2>List Data with pasgination</h2>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td>ID</td>
                <td>TID</td>
                <td>Todo Title</td>
              </tr>
            </MDBTableHead>
            {/* <MDBTableBody>{renderData(allTodos)}</MDBTableBody> */}
            <MDBTableBody>{renderData(currentItems)}</MDBTableBody>
          </MDBTable>
          {/* <ul className="pagenumbers">{renderPageNumbers}</ul> */}
          <ul className="pagenumbers">
            <li>
              <MDBBtn
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
                // style={{
                //   cursor: currentPage == pages[0] ? 'initial' : 'pointer',
                // }}
                className={
                  currentPage == pages[0] ? 'initialCls' : 'pointerCls'
                }
              >
                Prev
              </MDBBtn>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <li>
              <MDBBtn
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
              >
                {' '}
                Next
              </MDBBtn>
            </li>
          </ul>
          <button onClick={handleLoadMore} className="loadmore">
            Load More
          </button>
        </MDBContainer>
      </>
    </>
  );
}

export default PaginationT2;
