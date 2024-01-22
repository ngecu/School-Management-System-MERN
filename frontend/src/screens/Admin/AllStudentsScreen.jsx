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
import { listStudents } from '../../actions/studentActions';
import Topbar from './components/Topbar';



const AllStudents = () => {

  const match = useRouteMatch();
  const history = useHistory();

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch]);

  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }




  const generateStudentData = () => {
    return students.map((student) => (
      <tr key={student.id}>
        <td>{student.firstName} {student.lastName}</td>
        <td>{student.gender}</td>
        <td>{student.course.name}</td>     
        <td>{student.email}</td>
        <td>{student.dob}</td>
       
        <td>
        <a class="btn btn-success btn-sm" href="#">
                              <i class="fas fa-folder">
                              </i>
                              View
                          </a>
                          <a class="btn btn-info btn-sm" href="#">
                              <i class="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a class="btn btn-danger btn-sm" href="#">
                              <i class="fas fa-trash">
                              </i>
                              Delete
                          </a>
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
            <h5>All Students Data</h5>
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
            {generateStudentData()}
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

export default AllStudents;
