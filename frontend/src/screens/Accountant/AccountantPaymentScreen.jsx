import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import { AllFees } from '../../actions/feeActions';
import { listPaymentTransactions, togglePaymentApproval } from '../../actions/paymentActions';

const AccountantPaymentScreen = () => {
 const [studentId, setStudentId] = useState('');
  const dispatch = useDispatch();


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const paymentTransactionList = useSelector((state) => state.paymentTransactionList); // Assuming you have a fees reducer
  const { loading, error, paymentTransactions } = paymentTransactionList;

  const logoutHandler = () => {
    dispatch(logout());
  };

   const [message, setMessage] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
``
  const handleSearch = () => {
    if (studentId.trim() !== '') {
      dispatch(getFeesByStudent(studentId));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(listPaymentTransactions());
    }
  }, [dispatch, userInfo]);

  const ApprovePayment =(id,school_fee_id)=>{
    console.log(school_fee_id);
    console.log(id);

    dispatch(togglePaymentApproval(id,school_fee_id));
    dispatch(listPaymentTransactions());

    
  }

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
          <h1>All Payment Collection</h1>
          <Form>
            <Row>
              <Col md={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter student Name"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Button variant="primary" className="w-100" onClick={handleSearch}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>

         <Table striped bordered hover responsive className="table-sm">
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
                {paymentTransactions && paymentTransactions.map((transaction) => (
  <tr key={transaction._id}>
    <td>{transaction.schoolFees.student.firstName}</td>
    <td>{transaction.amount}</td>
    <td>
      <span className={`badge ${transaction.approved != true ? 'badge-danger' : 'badge-success'}`}>
        {`${transaction.approved}`}
      </span>
    </td>
    <td>{transaction.schoolFees.dueDate}</td>
    <td>{transaction.schoolFees.updatedAt}</td>
    <td>
      {/* View Button */}
      <Button variant="info" size="sm" onClick={() => handleView(transaction.schoolFees._id)}>
        View
      </Button>{' '}
      {/* Edit Button */}
      {transaction.approved != true ? <> <Button variant="warning" size="sm" onClick={() => ApprovePayment(transaction._id,transaction.schoolFees._id)}>
        APPROVE
      </Button>{' '}</> : <></>}
    </td>
  </tr>
))}

                </tbody>
              </Table> 
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

export default AccountantPaymentScreen;
