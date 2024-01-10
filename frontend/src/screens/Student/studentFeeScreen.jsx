import React, { useState, useEffect } from 'react';
import { Table, Form,Row, Col, ListGroup, Container,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getFeesByStudent } from '../../actions/feeActions';
import { Modal } from 'antd';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';

const localizer = momentLocalizer(moment) // or globalizeLocalizer
const { Option } = Select;

const studentFeeScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const match = useRouteMatch();
  const history = useHistory();

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  // const userDetails = useSelector((state) => state.userDetails);
  // const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const feesByStudent = useSelector((state) => state.getFeesByStudent); // Assuming you have a fees reducer
  const { loading, error, fees } = feesByStudent;

  const logoutHandler = () => {
    dispatch(logout());
  };

  
  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(getFeesByStudent(userInfo.userData._id)); // Dispatch the action with the student's ID
    }
  }, [dispatch, userInfo]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Handle the form submission, e.g., send the payment details to the backend
    makePayment(values);
  };

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
    

        <div class="w-100 pt-3">
     
    <div class="card">
        <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
                                FEE DASHBOARD

                            <Modal title="Make Payment" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please enter the payment amount' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="paymentMethod"
          label="Payment Method"
          rules={[{ required: true, message: 'Please select the payment method' }]}
        >
          <Select>
            <Select.Option value="creditCard">Credit Card</Select.Option>
            <Select.Option value="debitCard">Debit Card</Select.Option>
            {/* Add more payment methods as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="transactionDate"
          label="Transaction Date"
          rules={[{ required: true, message: 'Please select the transaction date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="transactionId"
          label="Transaction ID"
          rules={[{ required: true, message: 'Please enter the transaction ID' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Make Payment
          </Button>
        </Form.Item>
      </Form>
    </Modal>

                            </div>

            <h5 class="mb-0"></h5>
        </div>
        <div class="card-body">
            <div class="row">

            <div class="col-md-12 mb-4">
                    <div class="card">
                        <div class="card-body">

                        {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
                            <h5 class="card-title">This Semester</h5>
                            
                            <p class="card-text">Fee Amount: {fees[0].amount}</p>
                            <p class="card-text">Amount Paid: 0</p>
                            <p class="card-text">Amount Remaining: {fees[0].amount}</p>

                            </>)}
                        </div>
                    </div>
                </div>
              
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                                Transaction History
                                <a href="/transactions" class="btn btn-sm btn-primary">Show All Transactions</a>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Amount Paid</th>
                                        <th>Amount Rem</th>

                                        <th>Payment Method</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>123456</td>
                                        <td>$500</td>
                                        <td>$500</td>

                                        <td>Credit Card</td>
                                        <td>2023-01-15</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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

export default studentFeeScreen;
