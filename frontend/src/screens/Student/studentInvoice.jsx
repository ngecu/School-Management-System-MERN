import React, { useState, useEffect } from 'react';
import {  Row, Col, ListGroup, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getFeesByStudent } from '../../actions/feeActions';
import {  Form,Table } from 'antd';
import { createPaymentTransaction, initiateStkPush, listPaymentTransactionsByFee } from '../../actions/paymentActions';
import {v4} from 'uuid'
import { NavLink } from 'react-router-dom';
import Topbar from './components/Topbar';
import { Badge } from 'react-bootstrap';


const studentInvoiceScreen = () => {



  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const feesByStudent = useSelector((state) => state.getFeesByStudent); // Assuming you have a fees reducer
  const { loading, error, fees } = feesByStudent;

  const paymentTransactionsByFee = useSelector((state) => state.paymentTransactionByFee);
  const { loading: paymentTransactionsLoading, error: paymentTransactionsError, paymentTransactions } = paymentTransactionsByFee;


  console.log("fees is ",fees)

  const today = new Date();

  // Extract day, month, and year
  const day = today.getDate();
  const month = today.getMonth() + 1; // Adding 1 because months are zero-based
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
 
    // Generate a random invoice number (7 digits)
    const invoiceNumber = Math.floor(Math.random() * 9000000) + 1000000;

    // Generate a random order ID (6 characters)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
    for (let i = 0; i < 6; i++) {
      orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(getFeesByStudent(userInfo.userData._id)); // Dispatch the action with the student's ID
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (fees && fees._id) {
      console.log("school fees is as followins ",fees)
      dispatch(listPaymentTransactionsByFee(fees._id));
    }
  }, [dispatch, fees,userInfo]);

  const [form] = Form.useForm();

  


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
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="callout callout-info">
              <h5><i class="fas fa-info"></i> Note:</h5>
              This page has been enhanced for printing.
            </div>


           
            <div class="invoice p-3 mb-3">
             
              <div class="row">
                <div class="col-12">
                  <h4>
                    <i class="fas fa-globe"></i> EVE SMS, Inc.
                    <small class="float-right">Date: {formattedDate}</small>
                  </h4>
                </div>
               
              </div>
             
              <div class="row invoice-info">
                <div class="col-sm-4 invoice-col">
                  From
                  <address>
                    <strong>School Mng., Inc.</strong><br/>
                   
                  </address>
                </div>
           
                <div class="col-sm-4 invoice-col">
  To
  <address>
    <strong>{userInfo.firstName} {userInfo.lastName}</strong><br/>
    {userInfo.address && (
      <>
        {userInfo.address.street && <>{userInfo.address.street},</>}
        {userInfo.address.suite && <> Suite {userInfo.address.suite},</>}
        {userInfo.address.city && <>{userInfo.address.city},</>}
        {userInfo.address.state && <>{userInfo.address.state} {userInfo.address.zipCode},</>}
        <br/>
      </>
    )}
    Phone: {userInfo.userData.phone || 'N/A'}<br/>
    Email: {userInfo.email}
  </address>
</div>

                
<div className="col-sm-4 invoice-col">
      <b>Invoice #{invoiceNumber}</b><br/>
      <br/>
      <b>Order ID:</b> {orderId}<br/>
    </div>
                
              </div>
              

              
              <div class="row">
                <div class="col-12 table-responsive">
                <Table columns={columns} dataSource={data} />

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

export default studentInvoiceScreen;
