/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from 'mdb-react-ui-kit';

function PaginationT1() {
  const [allUsers, setAllUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('');

  // const getAllUsers = async () => {
  //   await axios
  //     .get('http://localhost:5000/users')
  //     .then((response) => {
  //       // console.log('getAllUsers', response);
  //       const { data, status } = response;
  //       if (status == 200) {
  //         // console.log('res', data);
  //         setAllUsers(data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  // useEffect(() => {
  //   getAllUsers();
  // }, []);

  // for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(4);
  const [sortFilterValue, setSortFilterValue] = useState('');
  const [operation, setOperation] = useState('');

  const getAllUsers = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    // used to add on sort & filter
    switch (optType) {
      case 'search':
        setOperation(optType);
        setSortValue('');
        return await axios
          .get(
            `http://localhost:5000/users?q=${searchValue}&_start=${start}&_end=${end}`
          )
          .then((resSearch) => {
            const { data, status } = resSearch;
            setAllUsers(data);
            setCurrentPage(currentPage + increase);
          })
          .catch((error) => {
            console.error(error);
          });

      case 'sort':
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:5000/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((resSearch) => {
            const { data, status } = resSearch;
            setAllUsers(data);
            setCurrentPage(currentPage + increase);
          })
          .catch((error) => {
            console.error(error);
          });

      case 'filter':
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:5000/users?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((resSearch) => {
            const { data, status } = resSearch;
            setAllUsers(data);
            setCurrentPage(currentPage + increase);
          })
          .catch((error) => {
            console.error(error);
          });

      default:
        return await axios
          .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
          .then((response) => {
            // console.log('getAllUsers', response);
            const { data, status } = response;

            // console.log('res', data);
            setAllUsers(data);
            setCurrentPage(currentPage + increase);
          })
          .catch((error) => {
            console.error(error);
          });
    }
    // used to add on sort & filter end

    // await axios
    //   // .get(`http://localhost:5000/users?_start=0&_end=4`)
    //   .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
    //   .then((response) => {
    //     // console.log('getAllUsers', response);
    //     const { data, status } = response;
    //     if (status == 200) {
    //       // console.log('res', data);
    //       setAllUsers(data);
    //       setCurrentPage(currentPage + increase);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const renderPagination = () => {
    if (allUsers.length < 4 && currentPage === 0) {
      return null;
    }
    if (currentPage === 0) {
      return (
        <>
          <MDBPagination className="mb-0">
            <MDBPaginationItem>
              <MDBPaginationLink>1</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              {/* <MDBBtn onClick={() => getAllUsers(4, 8, 1)}>Next</MDBBtn> */}
              <MDBBtn
                onClick={() => getAllUsers(4, 8, 1, operation, sortFilterValue)}
              >
                Next
              </MDBBtn>
            </MDBPaginationItem>
          </MDBPagination>
        </>
      );
    } else if (currentPage < pageLimit - 1 && allUsers.length === pageLimit) {
      return (
        <>
          <MDBPagination className="mb-0">
            <MDBPaginationItem>
              <MDBBtn
                // going to backword so "-1"
                // onClick={() =>
                //   getAllUsers((currentPage - 1) * 4, currentPage * 4, -1)
                // }
                onClick={() =>
                  getAllUsers(
                    (currentPage - 1) * 4,
                    currentPage * 4,
                    -1,
                    operation,
                    sortFilterValue
                  )
                }
              >
                Prev
              </MDBBtn>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBBtn
                // going to foreword so "-1"

                // onClick={() =>
                //   getAllUsers((currentPage + 1) * 4, (currentPage + 2) * 4, 1)
                // }
                onClick={() =>
                  getAllUsers(
                    (currentPage + 1) * 4,
                    (currentPage + 2) * 4,
                    1,
                    operation,
                    sortFilterValue
                  )
                }
              >
                Next
              </MDBBtn>
            </MDBPaginationItem>
          </MDBPagination>
        </>
      );
    } else {
      return (
        <>
          <MDBPagination className="mb-0">
            <MDBPaginationItem>
              {/* <MDBBtn onClick={() => getAllUsers(4, 8, -1)}>Prev</MDBBtn> */}
              {/* <MDBBtn onClick={() => getAllUsers(4, 8, -1, operation)}>
                Prev
              </MDBBtn> */}
              <MDBBtn
                onClick={
                  ((() => getAllUsers((currentPage - 1) * 4), currentPage * 4),
                  -1,
                  operation,
                  sortFilterValue)
                }
              >
                Prev
              </MDBBtn>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
            </MDBPaginationItem>
          </MDBPagination>
        </>
      );
    }
  };

  useEffect(() => {
    getAllUsers(0, 4, 0);
  }, []);

  // for pagination end

  const handleReset = (e) => {
    // e.preventDefault();
    // getAllUsers();
    // for pagination
    setOperation('');
    searchValue('');
    setSortFilterValue('');
    setSortValue('');
    setSearchValue('');
    getAllUsers(0, 4, 0);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // if use pagination used
    // "search" is an operation
    getAllUsers(0, 4, 0, 'search');

    // await axios
    //   .get(`http://localhost:5000/users?q=${searchValue}`)
    //   .then((resSearch) => {
    //     const { data, status } = resSearch;
    //     setAllUsers(data);
    //     // after search
    //     setSearchValue('');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  // sort
  const sortOptions = ['username', 'email', 'phone', 'address', 'status'];

  const handleSort = async (e) => {
    let targetSortValue = e.target.value;
    setSortValue(targetSortValue);
    // after using pagination
    getAllUsers(0, 4, 0, 'sort', targetSortValue);
    // return await axios
    //   .get(`http://localhost:5000/users?_sort=${targetSortValue}&_order=asc`)
    //   .then((resSearch) => {
    //     const { data, status } = resSearch;
    //     setAllUsers(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const handleFilter = async (filterValue) => {
    getAllUsers(0, 4, 0, 'filter', filterValue);
    // "status" word same as api
    // return await axios
    //   .get(`http://localhost:5000/users?status=${filterValue}`)
    //   .then((resSearch) => {
    //     const { data, status } = resSearch;
    //     setAllUsers(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <>
      <MDBContainer style={{ height: '200px' }}>
        <div style={{ marginTop: '100px' }}>
          <h2 className="text-center">
            pagination-search-filter-sort-json-server-js Type1
          </h2>
          <MDBRow>
            <form
              style={{
                margin: 'auto',
                padding: '15px',
                maxWidth: '400px',
                alignContent: 'center',
              }}
              className="d-flex input-group w-auto"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search by all..."
                id="searchfield"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {/* <MDBBtnGroup> */}
              <MDBBtn type="submit" color="dark">
                Search
              </MDBBtn>
              &nbsp;
              <MDBBtn
                className="mx-2"
                color="info"
                onClick={() => handleReset()}
              >
                Reset
              </MDBBtn>
              {/* </MDBBtnGroup> */}
            </form>
          </MDBRow>
          {allUsers.length > 0 && (
            <>
              <MDBRow>
                <MDBCol size="8">
                  <h5>Sort By:</h5>
                  <select
                    style={{
                      width: '50%',
                      borderRadius: '2px',
                      height: '35px',
                    }}
                    onChange={handleSort}
                    value={sortValue}
                  >
                    <option value="">Please Select</option>
                    {sortOptions &&
                      sortOptions.map((sortItem, i) => (
                        <option key={i} value={sortItem}>
                          {sortItem}
                        </option>
                      ))}
                  </select>
                </MDBCol>
                <MDBCol size="4">
                  <h5>Filter By Status:</h5>
                  <MDBBtnGroup>
                    <MDBBtn
                      color="success"
                      onClick={() => handleFilter('Active')}
                    >
                      Active
                    </MDBBtn>
                    <MDBBtn
                      color="danger"
                      style={{ marginLeft: '2px' }}
                      onClick={() => handleFilter('Inactive')}
                    >
                      Inactive
                    </MDBBtn>
                  </MDBBtnGroup>
                </MDBCol>
              </MDBRow>
            </>
          )}

          <br />

          <MDBRow>
            <MDBCol size="12">
              <MDBTable>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">#Sl.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Status</th>
                  </tr>
                </MDBTableHead>
                {allUsers.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-o">
                        {' '}
                        No Data Found!
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  <>
                    {allUsers &&
                      allUsers.map((item, index) => (
                        <>
                          <MDBTableBody key={item.id}>
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{item.username}</td>
                              <td>{item.email}</td>
                              <td>{item.phone}</td>
                              <td>{item.address}</td>
                              <td>{item.status}</td>
                            </tr>
                          </MDBTableBody>
                        </>
                      ))}
                  </>
                )}
              </MDBTable>
            </MDBCol>
          </MDBRow>
          <div
            style={{
              margin: 'auto',
              padding: '15px',
              maxWidth: '250px',
              alignContent: 'center',
            }}
          >
            {renderPagination()}
          </div>
        </div>
      </MDBContainer>
    </>
  );
}

export default PaginationT1;
