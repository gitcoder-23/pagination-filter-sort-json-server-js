import axios from 'axios';
import {
  MDBContainer,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';
import React, { useEffect, useRef, useState } from 'react';
import Loading from './loading.gif';

const InfiniteScroll = () => {
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingState, setLoadingState] = useState(false);

  // watch the doc
  // https://unsplash.com/documentation#list-photos

  const Access_Key = 'VaS3ud1C-0gdW1nw41FbBryaV_Q5obZ04o-3Vi2QC1E';
  const API_URL = `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=5`;

  const fetchAllPhotos = async () => {
    await axios
      .get(`${API_URL}`)
      .then((response) => {
        console.log('fetchAllPhotos->', response.data.reverse());
        // setPhotos(response.data);
        const { data } = response;
        // for infinite load
        setPhotos((photoData) => [...photoData, ...data]);
        setLoadingState(true);
        // setPhotos(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    fetchAllPhotos();
  }, [pageNumber]);

  const pageEnd = useRef();
  let num = 1;

  useEffect(() => {
    if (loadingState) {
      const observer = new IntersectionObserver(
        (entries) => {
          // console.log('entries', entries);
          console.log('entries', entries[0]);
          if (entries[0].isIntersecting) {
            num++;
            handleLoadMore();
            // after 50 "unobserve"
            // after 150 "unobserve"
            if (num >= 10) {
              observer.unobserve(pageEnd.current);
            }
          }
        },
        { threshold: 1 }
      );

      observer.observe(pageEnd.current);
    }
  }, [loadingState, num]);

  return (
    <div className="full-container">
      <MDBContainer>
        <h1 className="my-4" style={{ color: 'White' }}>
          InfiniteScroll Using React Hooks
        </h1>
        {photos &&
          photos.map((data, index) => (
            <>
              <MDBCard className="mt-4" key={data.id}>
                <MDBRow className="g-0 card-full">
                  <MDBCol md="4">
                    <MDBCardImage
                      src={data.urls.small}
                      alt={data?.user?.bio}
                      fluid
                      className="photoscss"
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle>
                        {data.user.first_name + ' ' + data.user.last_name}&nbsp;
                        <span style={{ float: 'right', color: 'red' }}>
                          Likes: {data.user.total_likes}
                        </span>
                      </MDBCardTitle>
                      <MDBCardText>
                        {data?.user?.bio === null ? (
                          <>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Maxime mollitia, molestiae quas vel sint
                            commodi repudiandae consequuntur voluptatum...
                          </>
                        ) : (
                          <>{data?.user?.bio?.substring(0, 100)}...</>
                        )}
                      </MDBCardText>
                      <MDBCardText>
                        <small className="text-muted">
                          Last updated at {data?.user?.updated_at}
                        </small>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </>
          ))}
        <div className="loading my-4">
          <img src={Loading} alt="" />
        </div>
        <div className="full-btn">
          <h3 className="h3css">{photos.length}</h3>
          <MDBBtn
            className="my-4 btnCss"
            onClick={handleLoadMore}
            ref={pageEnd}
          >
            Load More...
          </MDBBtn>
        </div>
      </MDBContainer>
      <style>{custonCss}</style>
    </div>
  );
};

export default InfiniteScroll;

const custonCss = `
.btnCss {
  // padding: 5px 20px;
  margin: 10px;
  cursor: pointer;
}
.full-container{
  background: #1c273a;
}
.loading img{
  margin: 10px;
  height: 50px;

}

.loading {
  justify-content: center;
  display: flex;
}

.full-btn{
  justify-content: center;
  // display: flex;
  text-align: center;
}

.h3css{
  text-align: center;
}
`;
