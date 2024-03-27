import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import { AllFees, getFeesByStudent } from '../../actions/feeActions';
import Topbar from './components/Topbar';

const AdminFeeScreen = () => {
 const [studentId, setStudentId] = useState('');
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('')

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

    const getAllFees = useSelector((state) => state.getAllFees); // Assuming you have a fees reducer
  const { loading, error, fees } = getAllFees;


  const logoutHandler = () => {
    dispatch(logout());
  };

   const [message, setMessage] = useState(null);
   const [search, setSearch] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const filteredFees = fees.filter((fee) =>
  fee.student?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  fee.student?.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) 
);
  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(AllFees());
    }
  }, [dispatch, userInfo]);

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

        <div class="row pt-3">
     
            <div class="col-xl-12 col-md-12 mb-4">
              <div class="card h-100">
                <div class="card-body">
        
        <div>
          <h1>All Fees Collection</h1>
          <Form>
            <Row>
              <Col md={12}>
              <Form.Control
                      type="text"
                      placeholder="Search By Admission No."
                      className="mr-2"
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
        {!search ? <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                   

                  </tr>
                </thead>
                <tbody>
                {filteredFees.map((fee) => (
                                <tr key={fee._id}>
                                  <td>{fee.student?.admissionNumber}</td>

                                  <td>{fee.student?.firstName}</td>
                                  <td>{fee.amount}</td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        fee.status === 'Pending' ? 'badge-danger' : 'badge-success'
                                      }`}
                                    >
                                      {fee.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                </tbody>
              </Table> : <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Due Date</th>
                  
                    <th>Updated At</th>
                    <th></th>

                  </tr>
                </thead>
                <tbody>
                {generateFeeData()}
                </tbody>
              </Table>
              }
              </> 
        </div>
    
                </div>
              </div>
            </div>

        </div>

        
        </div>

        </section>
        </div>
          )
          }


</div>

    </div>
  );
};

export default AdminFeeScreen;
