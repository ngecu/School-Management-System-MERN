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
import { deleteLecturer, listLecturers } from '../../actions/lecturerActions';
import Topbar from './components/Topbar';
import {  Modal } from 'antd'


const AllLecturers = () => {
    const dispatch = useDispatch();
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lecturerData, setLecturerData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');


    const showModal = (lecturerData) => {
      setLecturerData(lecturerData); // Assuming you have a state variable to store lecturer data
      setIsModalOpen(true);
    };
  
    
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
  
    const deleteHandler = (lecturerID)=>{
      console.log("i am deleting");

      if (window.confirm('Are you sure')) {
        dispatch(deleteLecturer(lecturerID))
      }


    }
    const lecturerList = useSelector((state) => state.lecturerList);
    const { loading, error, lecturers } = lecturerList;
  

    const lecturerDelete = useSelector((state) => state.lecturerDelete)
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = lecturerDelete

    useEffect(() => {
      dispatch(listLecturers());
    }, [dispatch,successDelete]);

    if (loading) {
      return <Loader />;
    }
  
    if (error) {
      return <Message variant="danger">{error}</Message>;
    }
  
    const generateLecturerData = () => {
      const filteredLecturers = lecturers.filter((lecturer) =>
      lecturer.lecturer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer.lecturer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer.lecturer.email.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more fields as needed for searching
    );

    
      return filteredLecturers.map((lecturer) => (
        <React.Fragment key={lecturer.lecturer?._id}>
       
        
        <tr key={lecturer.lecturer?._id}>
          <td>{lecturer.lecturer?.firstName} {lecturer?.lastName}</td>
          <td>{lecturer.lecturer?.gender}</td>
        <td>{lecturer.lecturer?.school?.name}</td>     
        <td>{lecturer.lecturer?.email}</td>
        <td>{lecturer.lecturer?.dob}</td>
          {/* Add more lecturer-specific fields as needed */}
          <td>
          <button
            className="btn btn-success btn-sm"
            onClick={() => showModal(lecturer.lecturer)}
          >
            <i className="fas fa-folder"></i> View
          </button>
         
            <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(lecturer.lecturer._id)}>
              <i className="fas fa-trash"></i> Delete
            </button>
          </td>
        </tr>
        </React.Fragment>
        
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
            <Form.Control
  type="text"
  placeholder="Search"
  className="mr-2"
  value={searchQuery}
  onChange={(e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value)
  }}
/>
             
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

<Modal
  title="Lecturer Details"
  visible={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  {lecturerData && (
    <>
      <p>Name: {lecturerData.firstName} {lecturerData.lastName}</p>
      <p>Gender: {lecturerData.gender}</p>
      <p>School: {lecturerData.school?.name}</p>
      {/* Add more lecturer-specific fields as needed */}
    </>
  )}
</Modal>


    </div>
  );
};

export default AllLecturers;
