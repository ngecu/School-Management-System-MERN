import React, {  useEffect } from 'react';
import { Table, Space, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {  useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import { AllFees } from '../../actions/feeActions';
import Topbar from './components/Topbar';

const AccountantFeeScreen = () => {

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(AllFees()); 
    }
  }, [dispatch, userInfo]);

   
    const data = fees
    
      const columns = [
        {
          title: 'Student Name',
          dataIndex: 'student',
          key: 'student',
          render: (student) => <span>{student.name}</span>,
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => (
            <Tag color={status === 'Paid' ? 'green' : 'volcano'}>{status}</Tag>
          ),
        },
        {
          title: 'Due Date',
          dataIndex: 'dueDate',
          key: 'dueDate',
          render: (dueDate) => <span>{new Date(dueDate).toLocaleDateString()}</span>,
        },
        {
          title: 'Transaction ID',
          dataIndex: 'transactionId',
          key: 'transactionId',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
            
            
            </Space>
          ),
        },
      ];


  return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

<Topbar/>
        <Sidebar />
        <div class="content-wrapper">

        <section class="content">
      <div class="container-fluid">

        <div class="row pt-3">
     
            <div class="col-xl-12 col-md-12 mb-4">
              <div class="card h-100">
                <div class="card-body">
                <Table dataSource={data} columns={columns} />
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
