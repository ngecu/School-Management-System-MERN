import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container, Card, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar'
import { deleteStudent, listStudents } from '../../actions/studentActions';
import Topbar from './components/Topbar';
import {  Modal } from 'antd'



const AllStudents = () => {


  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const showModal = (data) => {
      setStudentData(data); 
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
        dispatch(deleteStudent(lecturerID))
      }


    }



  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;

  const studentDelete = useSelector((state) => state.studentDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = studentDelete

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch,successDelete]);


  const generateStudentData = () => {
    const filteredStudents = students.filter(
      (student) =>
        student.student?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student?.email.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more fields as needed for searching
    );
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  
    return (
      <>
        {currentItems.map((student) => (
          <React.Fragment key={student?._id}>
            <tr key={student.student?._id}>
            <td>{student.student?.firstName} {student.student?.lastName}</td>
<td>{student.student?.gender}</td>
<td>{student.cstudent?.course.name}</td>     
<td>{student.student?.email}</td>
<td>{student.student?.dob}</td>

<td>
<button
    className="btn btn-success btn-sm"
    onClick={() => showModal(student.student)}
  >
    <i className="fas fa-folder"></i> View
  </button>
 
    <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(student._id)}>
      <i className="fas fa-trash"></i> Delete
    </button>

    {student.user?.isActive ? (
    <button className="btn btn-warning btn-sm" onClick={() => toggleStatus(student.user._id)}>
      <i className="fas fa-times"></i> Deactivate
    </button>
  ) : (
    <button className="btn btn-primary btn-sm" onClick={() => toggleStatus(student.user._id)}>
      <i className="fas fa-check"></i> Activate
    </button>
  )}

</td>
            </tr>
          </React.Fragment>
        ))}
        <Pagination>
          {[...Array(Math.ceil(filteredStudents.length / itemsPerPage)).keys()].map(
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
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                  <h5>All Students Data</h5>
                  <Form inline>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className="mr-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                    {generateStudentData()}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-end"></div>
              </Card.Footer>
            </Card>
            </div>
            </section>
            </div>
          )}
       


</div>

<Modal
  title="Student Details"
  visible={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  {studentData && (
     <Row >
          <Col style={{textAlign:"center"}} md={12}>
       
       <img src={studentData.photo} alt="Student" style={{ maxWidth: '100%' }} />
     </Col>

     <Col md={6}>
       <strong>National ID:</strong> {studentData.nationalID}
     </Col>
     <Col md={6}>
       <strong>Year of Study:</strong> {studentData.yearOfStudy}
     </Col>
     <Col md={6}>
       <strong>Course:</strong> {studentData.course.name}
     </Col>
     <Col md={6}>
       <strong>Email:</strong> {studentData.email}
     </Col>
     
     <Col md={6}>
       <strong>First Name:</strong> {studentData.firstName}
     </Col>
     <Col md={6}>
       <strong>Last Name:</strong> {studentData.lastName}
     </Col>
     <Col md={6}>
       <strong>Gender:</strong> {studentData.gender}
     </Col>
     <Col md={6}>
       <strong>DOB:</strong> {studentData.dob}
     </Col>
     <Col md={6}>
       <strong>Religion:</strong> {studentData.religion}
     </Col>
     <Col md={6}>
       <strong>Phone:</strong> {studentData.phone}
     </Col> 
 
   </Row>
  )}
</Modal>


    </div>
  );
};

export default AllStudents;
