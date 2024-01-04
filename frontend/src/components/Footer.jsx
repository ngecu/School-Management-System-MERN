import React, { useEffect } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
// import { listEvents } from '../actions/eventActions';
// import { listTopProducts } from '../actions/productActions';
// import Rating from './Rating';

const Footer = () => {
  const dispatch = useDispatch();


//   useEffect(() => {
//     // dispatch(listEvents(''))
//     // dispatch(listTopProducts())
// },[dispatch])

  return (
    <>
<section className="">
  <div className="text-center text-md-start mt-5">
  <Row className='w-100'>
  <Col xs={12} sm={3} md={3} lg={3} xl={3} className="text-left">
    <div id="custom_html-10" className="widget_text widget widget_custom_html">
      <b className="gamma widget-title"> <i className="fas fa-users"></i> Diverse Student Population</b>
      <div className="textwidget custom-html-widget">
        <p>Our school boasts a diverse student body, fostering an inclusive and enriching educational environment.</p>
      </div>
    </div>
  </Col>

  <Col xs={12} sm={3} md={3} lg={3} xl={3} className="text-left">
    <div id="custom_html-8" className="widget_text widget widget_custom_html">
      <span className="gamma widget-title"> <i className="fas fa-book"></i> Comprehensive Curriculum</span>
      <div className="textwidget custom-html-widget">
        <p>We offer a well-rounded curriculum that includes STEM courses, humanities, arts, and physical education.</p>
      </div>
    </div>
  </Col>

  <Col xs={12} sm={3} md={3} lg={3} xl={3} className="text-left">
    <div id="custom_html-9" className="widget_text widget widget_custom_html">
      <span className="gamma widget-title"><i className="fas fa-chalkboard-teacher"></i> Experienced Faculty</span>
      <div className="textwidget custom-html-widget">
        <p>Our dedicated and experienced teaching staff is committed to providing quality education and mentorship.</p>
      </div>
    </div>
  </Col>

  <Col xs={12} sm={3} md={3} lg={3} xl={3} className="text-left">
    <div id="custom_html-11" className="widget_text widget widget_custom_html">
      <span className="gamma widget-title"> <i className="fas fa-graduation-cap"></i> Holistic Student Development</span>
      <div className="textwidget custom-html-widget">
        <p>We focus on nurturing not only academic excellence but also character, leadership, and extracurricular talents.</p>
      </div>
    </div>
  </Col>
</Row>

  </div>
</section>


      <footer className="text-lg-start   text-light">
    
      <Container>

      <Row className='w-100'>
        <Col md={3} className='py-2'>
        © School Management System  2024
        <br/>
        Built with love by DevNgecu
        </Col>

        <Col md={3} className='py-2'>
      
        </Col>

        <Col md={3} className='py-2'>
      
      </Col>

        <Col md={3}>
          <Link className="text-danger" to="#">
          <i class="fas fa-phone"></i> 0707583092
          </Link>
         
        </Col>
      </Row>
      </Container>
      
      {/* Copyright */}
    </footer>

    </>
    
  )
}

export default Footer
