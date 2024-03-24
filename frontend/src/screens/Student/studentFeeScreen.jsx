import React, { useState, useEffect } from 'react';
import {  Row, Col, ListGroup, Container, Button } from 'react-bootstrap';
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
import { Modal, Form, Input, DatePicker, Select,Table } from 'antd';
import { createPaymentTransaction, initiateStkPush, listPaymentTransactionsByFee } from '../../actions/paymentActions';
import {v4} from 'uuid'
import { NavLink } from 'react-router-dom';
import Topbar from './components/Topbar';
import { Badge } from 'react-bootstrap';


const localizer = momentLocalizer(moment) 
const { Option } = Select;

const studentFeeScreen = () => {
  const [isMpesa, setIsMpesa] = useState(true);


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



  const location = useLocation();
  const { pathname } = location;



  const dispatch = useDispatch();


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const feesByStudent = useSelector((state) => state.getFeesByStudent); // Assuming you have a fees reducer
  const { loading, error, fees } = feesByStudent;

  const paymentTransactionsByFee = useSelector((state) => state.paymentTransactionByFee);
  const { loading: paymentTransactionsLoading, error: paymentTransactionsError, paymentTransactions } = paymentTransactionsByFee;


  console.log("fees is ",fees)
  const logoutHandler = () => {
    dispatch(logout());
  };

  
  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(getFeesByStudent(userInfo.userData._id)); // Dispatch the action with the student's ID
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (fees && fees._id) {
   
      dispatch(listPaymentTransactionsByFee(fees._id));
    }
  }, [dispatch, fees,userInfo]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Handle the form submission, e.g., send the payment details to the backend
    values.schoolFees = fees._id
    values.transactionId = v4()
    
    // makePayment(values);
 
    if(values.paymentMethod == "mpesa"){
      dispatch(initiateStkPush(values))
    }
    else{
   
    dispatch(createPaymentTransaction(values))

    }
  };


  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
    },
    {
      title: 'approved',
      dataIndex: 'approved',
      key: 'approved',
      render: (approved) => (
        <Badge variant={approved ? 'success' : 'danger'}>
          {approved ? 'Approved' : 'Not Approved'}
        </Badge>
      ),
    },
    {
      title: 'Amount Remaining',
      dataIndex: 'amountRemaining',
      key: 'amountRemaining',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];
// Calculate the total amount paid from transactions where approved is true
const totalAmountPaid = paymentTransactions
  .filter(transaction => transaction.approved) // Filter transactions with approved === true
  .reduce((total, transaction) => total + transaction.amount, 0); // Sum the amounts


  const data = paymentTransactions.map((transaction) => ({
    key: transaction._id,
    transactionId: transaction.transactionId,
    amountPaid: transaction.amount,
    approved: transaction.approved,
    amountRemaining:(fees.amount - transaction.amount),
    // amountRemaining: transaction.amountRemaining,
    paymentMethod: transaction.paymentMethod,
    date: moment(transaction.createdAt).format('YYYY-MM-DD'),
  }));

  return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

<Topbar/>
        <Sidebar />
        <div class="content-wrapper">

        <section class="content">
    

        <div class="w-100 pt-3">
     
    <div class="card">
        <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">

   
        FEE DASHBOARD 
        {!error && !loading && fees && <div>
        
          <NavLink to="/student/invoice" className="btn btn-primary mx-2">
            View Invoice
          </NavLink>

          <Button class="btn btn-sm btn-primary" onClick={showModal}>Make Payment</Button>

          
          </div>

        }
                         

                               

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
          
        >
          <Input placeholder='M-PESA' type='text' value={`M-PESA`}  disabled />
         
        </Form.Item>


{isMpesa && (
  <Form.Item
    name="phoneNumber"
    label="Phone Number"
    rules={[
      { required: true, message: 'Please enter the phone number' },
      { min: 12, message: 'Phone number must be at least 12 digits' }
    ]}
  >
    <Input placeholder="254 718 678309" />
  </Form.Item>
)}

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
                   

                        {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <div class="row">

                                <div class="col-md-4 mb-4">
                                  <div class="card">
                                    <div class="card-body">
                                      <h5 class="card-title">Semester Fee : </h5>

                                      <p class="card-text"> {fees && fees.amount + totalAmountPaid} </p>
                                    
                                    </div>
                                  </div>
                                </div>

                                <div class="col-md-4 mb-4">
                                  <div class="card">
                                    <div class="card-body">
                                      <h5 class="card-title">paid : </h5>

                                      <p class="card-text"> {totalAmountPaid} </p>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-md-4 mb-4">
                                  <div class="card">
                                    <div class="card-body">
                                      <h5 class="card-title">Remaining : </h5>

                                      <p class="card-text"> {fees && fees.amount} </p>
                                    </div>
                                  </div>
                                </div>
</div>
                            </>)}
                  
                </div>
              
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                                Transaction History
                            </div>
                        </div>
                        <div class="card-body">
                        <Table columns={columns} dataSource={data} />
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
