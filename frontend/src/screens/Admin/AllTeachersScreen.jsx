import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container, Card, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Collapse } from 'antd';
import Sidebar from './components/Sidebar'
import { listLecturers } from '../../actions/lecturerActions';
import Topbar from './components/Topbar';



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

  


  
<Topbar/>
  
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
