import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container, Card, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';

import { listParents } from '../../actions/parentActions';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';



const AllParentsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listParents());
  }, [dispatch]);

  const parentList = useSelector((state) => state.parentList);
  const { loading, error, parents } = parentList;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  const deleteHandler = (parentId) => {
    // Implement delete functionality here using dispatch(deleteParent(parentId))
  };

  const generateParentData = () => {
    return parents.map((parent) => (
      <tr key={parent._id}>
        <td>{parent.fullName}</td>
        <td>{parent.phone}</td>
        {/* Add more parent-specific fields as needed */}
        <td>{parent.email}</td>

        <td>{parent.students.length}</td>
   
        <td>
          <Link to={`/parents/${parent._id}`} className="btn btn-success btn-sm">
            <i className="fas fa-folder"></i> View
          </Link>
          <Link to={`/parents/${parent._id}/edit`} className="btn btn-info btn-sm">
            <i className="fas fa-pencil-alt"></i> Edit
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(parent._id)}>
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
            <h5>All Parents Data</h5>
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
                <th>Full Name</th>
                <th>Phone</th>
                <th>E-mail</th>
                <th>Students</th>
                
            
              </tr>
            </thead>
            <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
            {generateParentData()}
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

export default AllParentsScreen;
