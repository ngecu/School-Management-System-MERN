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
import { toggleUserActive } from '../../actions/userActions';


const AllLecturers = () => {
    const dispatch = useDispatch();
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lecturerData, setLecturerData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const showModal = (lecturerData) => {
      setLecturerData(lecturerData); 
      setIsModalOpen(true);
    };
  
    
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    const toggleStatus = (userId)=>{
      dispatch(toggleUserActive(userId))
    }
  
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

    const userTogleActive = useSelector((state)=> state.userTogleActive)
    const {
      success:successToggle
    } = userTogleActive

    useEffect(() => {
      dispatch(listLecturers());
    }, [dispatch,successDelete,successToggle]);

  
  
    const generateLecturerData = () => {
      const filteredLecturers = lecturers.filter((lecturer) =>
      lecturer.lecturer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer.lecturer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer.lecturer.email.toLowerCase().includes(searchQuery.toLowerCase())

    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLecturers = filteredLecturers.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <>
      {currentLecturers.map((lecturer) => (
        <React.Fragment key={lecturer.lecturer?._id}>
       
        
        <tr key={lecturer.lecturer?._id}>
          <td>{lecturer.lecturer?.firstName} {lecturer?.lecturer.lastName}</td>
          <td>{lecturer.lecturer?.gender}</td>
        <td>{lecturer.lecturer?.school?.name}</td>     
        <td>{lecturer.lecturer?.email}</td>
        <td>
  {lecturer.user?.isActive ? (
    <span className="badge badge-success">Active</span>
  ) : (
    <span className="badge badge-danger">Inactive</span>
  )}
</td>
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

            {lecturer.user?.isActive ? (
    <button className="btn btn-warning btn-sm" onClick={() => toggleStatus(lecturer.user._id)}>
      <i className="fas fa-times"></i> Deactivate
    </button>
  ) : (
    <button className="btn btn-primary btn-sm" onClick={() => toggleStatus(lecturer.user._id)}>
      <i className="fas fa-check"></i> Activate
    </button>
  )}
          </td>
        </tr>
        </React.Fragment>
        
      ))
    };

<Pagination>
          {[...Array(Math.ceil(filteredLecturers.length / itemsPerPage)).keys()].map(
            (pageNumber) => (
              <Pagination.Item
                key={pageNumber + 1}
                active={pageNumber + 1 === currentPage}
                onClick={() => paginate(pageNumber + 1)}
              >
                {pageNumber + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>

    </>
    )
  }


  return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  


  
<Topbar/>
  
  <Sidebar />
  {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
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
                <th>Status</th>
            
                <th></th>
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
          )}
       


</div>

<Modal
  title="Lecturer Details"
  visible={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  {lecturerData && (
     <Row >
     <Col style={{textAlign:"center"}} md={12}>
  
  <img src={lecturerData.photo} alt="Student" style={{ maxWidth: '100%' }} />
</Col>

<Col md={6}>
  <strong>National ID:</strong> {lecturerData.nationalID}
</Col>
<Col md={6}>
  <strong>Year of Study:</strong> {lecturerData.yearOfStudy}
</Col>
<Col md={6}>
  <strong>School:</strong> {lecturerData.school.name}
</Col>
<Col md={6}>
  <strong>Courses:</strong> {lecturerData.courses.length}
</Col>
<Col md={6}>
  <strong>Email:</strong> {lecturerData.email}
</Col>

<Col md={6}>
  <strong>First Name:</strong> {lecturerData.firstName}
</Col>
<Col md={6}>
  <strong>Last Name:</strong> {lecturerData.lastName}
</Col>
<Col md={6}>
  <strong>Gender:</strong> {lecturerData.gender}
</Col>
<Col md={6}>
  <strong>DOB:</strong> 
  <strong>DOB:</strong> {lecturerData.dob && new Date(lecturerData.dob).toLocaleDateString()}

</Col>
<Col md={6}>
  <strong>Religion:</strong> {lecturerData.religion}
</Col>
<Col md={6}>
  <strong>Phone:</strong> {lecturerData.phone}
</Col> 

</Row>
  )}
</Modal>


    </div>
  );
};

export default AllLecturers;
