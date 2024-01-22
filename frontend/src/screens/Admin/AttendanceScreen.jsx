import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container, Card, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import { listParents } from '../../actions/parentActions';
import { listAttendance } from '../../actions/attendanceActions';
import Topbar from './components/Topbar';



const AttendanceScreen = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(listAttendance());
    }, [dispatch]);
  
    const attendanceList = useSelector((state) => state.attendanceList);
    const { loading, error, attendances } = attendanceList;
  
    if (loading) {
      return <Loader />;
    }
  
    if (error) {
      return <Message variant="danger">{error}</Message>;
    }
  
    const generateAttendanceData = () => {
      return attendances.map((record) => (
        <tr key={record._id}>
          <td>{record.student.firstName}</td>
          <td>{record.course.name}</td>
          <td>{record.signInTime}</td>

          <td>
            <Link to={`/attendance/${record._id}`} className="btn btn-success btn-sm">
              <i className="fas fa-folder"></i> View
            </Link>
            <Link to={`/attendance/${record._id}/edit`} className="btn btn-info btn-sm">
              <i className="fas fa-pencil-alt"></i> Edit
            </Link>
            <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(record._id)}>
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
            <h5>All Attendance Data</h5>
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
                <th>student</th>
                <th>Course</th>
                <th>signInTime</th>
               
                
            
              </tr>
            </thead>
            <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
            {generateAttendanceData()}
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

export default AttendanceScreen;
