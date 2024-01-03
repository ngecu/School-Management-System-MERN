import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card, CardDeck } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
// import { listProducts } from '../actions/productActions'
import { Skeleton } from 'antd'
// import { listCategories } from '../actions/categoryActions'
// import { getAllBanners } from '../actions/bannerActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

 

  // useEffect(() => {
  //   dispatch(getAllBanners())

  //   dispatch(listCategories())
  //   dispatch(listProducts(keyword, pageNumber))
  // }, [dispatch, keyword, pageNumber])


  const scrollRef = useRef(null);

  const handleImageError = (e) => {
    e.target.src = 'https://www.barschool.net/sites/default/files/styles/image_gallery_xl/public/2022-05/Cuba%20Libre.jpg?h=2d7bcac0&itok=pEsF8LVB';
  };


  return (
    <>
      <Meta />
      {!keyword ? (
        // <ProductCarousel />
        <>
        {loading ? (
        <Skeleton active />):(
          <img src={banners[banners.length - 1]?.url} className='w-100' />

        )
        }
        </>
       
      ) : (
        <Container>
        <Link to='/' className='btn btn-primary'>
          Go Back
        </Link>
        </Container>
      )}
      <Container>
      <>

      <Row className='my-2 w-100'>
          {categories && categories.map((category)=>(
            <Col key={category._id} xs={6} sm={6} md={3} lg={3} xl={3}>
                <Link to={`/category/${category._id}`}>
                <Card>
                
                <Card.Img src={category.image} className='category-image' variant='top' onError={handleImageError} />
               

                  <Card.Body className='text-center p-0'>
       
          <Card.Title as='div'>
            <strong>{category.name}</strong>
          </Card.Title>

      </Card.Body>

                </Card>
                </Link>
            
          </Col>
          ))}

        </Row>
        
      {!keyword ? <h6>New Arrivals</h6> : <h6>{keyword} Results</h6> }
      </>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
       <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
  <style>
    {`
      div::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
      }
      div::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
      }
    `}
  </style>
  <Row className='flex-nowrap w-100 new-arrival'>
    {products.reverse().map((product) => (
      <Col key={product._id} xs={6} sm={6} md={3} lg={3} xl={3} className='px-1'>
        <Product product={product} />
      </Col>
    ))}
  </Row>
</div>
        </>
      )}


{!keyword && categories && categories.map((i,index)=>(
  <>
  <h6>{i.name}(S)
  
  <Link
                to={`/category/${i._id}`}
                className="float-right"
              >
                View All &rarr;
              </Link>

  </h6>
  <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
  <style>
    {`
      div::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
      }
      div::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
      }
    `}
  </style>
  <Row className='flex-nowrap w-100'>
  {products
    .filter((product) => product.category === i._id)
    .map((product) => (
      <Col key={product._id} xs={6} sm={6} md={3} lg={3} xl={3} className="h-100 px-1">
        <Product product={product} />
      </Col>
    ))}
</Row>
</div>
</>
)) }
</Container>
    </>
  )
}

export default HomeScreen
