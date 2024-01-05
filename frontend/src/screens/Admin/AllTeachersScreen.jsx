import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container, Card, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Collapse } from 'antd';
import Sidebar from '../../components/Sidebar'
import { listLecturers } from '../../actions/lecturerActions';



const AllLecturers = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(listLecturers());
    }, [dispatch]);
  
    const lecturerList = useSelector((state) => state.lecturerList);
    const { loading, error, lecturers } = lecturerList;
  
    if (loading) {
      return <Loader />;
    }
  
    if (error) {
      return <Message variant="danger">{error}</Message>;
    }
  
    const generateLecturerData = () => {
      return lecturers.map((lecturer) => (
        <tr key={lecturer._id}>
          <td>{lecturer.firstName} {lecturer.lastName}</td>
          <td>{lecturer.gender}</td>
        <td>{lecturer.school.name}</td>     
        <td>{lecturer.email}</td>
        <td>{lecturer.dob}</td>
          {/* Add more lecturer-specific fields as needed */}
          <td>
            <Link to={`/lecturers/${lecturer._id}`} className="btn btn-success btn-sm">
              <i className="fas fa-folder"></i> View
            </Link>
            <Link to={`/lecturers/${lecturer._id}/edit`} className="btn btn-info btn-sm">
              <i className="fas fa-pencil-alt"></i> Edit
            </Link>
            <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(lecturer._id)}>
              <i className="fas fa-trash"></i> Delete
            </button>
          </td>
        </tr>
      ));
    };


  return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  


  
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
   
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    
    </ul>

    
    <ul class="navbar-nav ml-auto">


      
     
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

     
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-comments"></i>
          <span class="badge badge-danger navbar-badge">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item">
          
            <div class="media">
              <img src="dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Brad Diesel
                  <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">Call me whenever you can...</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
       
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
           
            <div class="media">
              <img src="dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  John Pierce
                  <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">I got your message bro</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
          
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
           
            <div class="media">
              <img src="dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Nora Silvester
                  <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">The subject goes here</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>
     
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true"  role="button">
          <i class="fas fa-th-large"></i>
          <i class="fas fa-right-from-bracket"></i>
        </a>
      </li>
    </ul>
  </nav>
  
        <Sidebar />
        <div class="content-wrapper">

        <section class="content">
      <div class="container-fluid">

    
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5>All LECTURERS Data</h5>
            <Form inline>
              <Form.Control type="text" placeholder="Search" className="mr-2" />
              <Button variant="primary">Search</Button>
            </Form>
          </div>
        </Card.Header>
        <Card.Body>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Course</th>
         
                <th>Address</th>
                <th>Date Of Birth</th>
            
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
            {generateLecturerData()}
          </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-end">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </Card.Footer>
      </Card>
 

        
        </div>

        </section>
        </div>
       


</div>

    </div>
  );
};

export default AllLecturers;
