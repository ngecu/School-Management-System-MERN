import React, { useState, useEffect } from 'react';
import { Table, Form,  Row, Col, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import { AllFees, getFeesByStudent } from '../../actions/feeActions';
import Topbar from './components/Topbar';

const AccountantFeeScreen = () => {
 const [studentId, setStudentId] = useState('');
  const dispatch = useDispatch();


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

    const getAllFees = useSelector((state) => state.getAllFees); // Assuming you have a fees reducer
  const { loading, error, fees } = getAllFees;


   const [search, setSearch] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
 

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(AllFees());
    }
  }, [dispatch, userInfo]);

  
  const generateFeeData = () => {
    const filteredStudents = fees.filter(
      (student) =>
      student.student?.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||

        student.student?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student?.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  
    return (
      <>
        {currentItems.map((student) => (
          <React.Fragment key={student?._id}>
            <tr key={student.student?._id}>
            <td>{student.student?.admissionNumber} </td>
            <td>{student.student?.firstName} {student.student?.lastName}</td>
            <td>{student.amount}</td>
            <td>{student.status}</td>     
            <td>{student.dueDate && new Date(student.dueDate).toLocaleDateString()}</td>     
            <td>{student.updatedAt && new Date(student.updatedAt).toLocaleDateString()}</td>
            


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


  return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  


  
  <Topbar />
        <Sidebar />
        <div class="content-wrapper">

        <section class="content">
      <div class="container-fluid">

        <div class="row pt-3">
     
            <div class="col-xl-12 col-md-12 mb-4">
              <div class="card h-100">
                <div class="card-body">
               {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h1>All Fees Collection</h1>
          <Form>
            <Row>
              <Col md={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter student Admission No."
                  value={searchQuery}
                      onChange={(e) => {
                        console.log("search data is ",e.target.value);
                        setSearchQuery(e.target.value)}
                      }
                />
              </Col>
              
            </Row>
          </Form>
<>
        <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th>Student</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Due Date</th>
                  
                    <th>Updated At</th>
                   

                  </tr>
                </thead>
                <tbody>
                 {generateFeeData()}
                </tbody>
              </Table> 
              </> 
        </div>
      )}
                </div>
              </div>
            </div>

        </div>

        
        </div>

        </section>
        </div>
       


</div>

    </div>
  );
};

export default AccountantFeeScreen;
