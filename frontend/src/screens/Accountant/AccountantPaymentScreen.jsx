import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col,Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import { AllFees } from '../../actions/feeActions';
import { listPaymentTransactions, togglePaymentApproval } from '../../actions/paymentActions';
import Topbar from './components/Topbar';

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


  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const generateTransactionData = () => {
    const filteredTransactions = paymentTransactions.filter(
      (transaction) =>
        transaction.schoolFees.student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.schoolFees.student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.schoolFees.student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.schoolFees.student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  
    return (
      <>
        {currentItems.map((transaction) => (
          <tr key={transaction._id}>
            <td>{transaction.transactionId}</td>
            <td>{transaction.schoolFees.student.admissionNumber}</td>
            <td>{transaction.schoolFees.student.firstName} {transaction.schoolFees.student.lastName}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.schoolFees.amount}</td>
            <td>
              <span className={`badge ${transaction.approved !== true ? 'badge-danger' : 'badge-success'}`}>
                {`${transaction.approved}`}
              </span>
            </td>
            <td>{transaction.paymentMethod}</td>
            <td>{transaction.createdAt && new Date(transaction.createdAt).toLocaleDateString()}</td>
            <td>{transaction.updatedAt && new Date(transaction.updatedAt).toLocaleDateString()}</td>
            <td>
              {transaction.approved !== true && (
                <Button variant="warning" size="sm" onClick={() => ApprovePayment(transaction._id, transaction.schoolFees._id)}>
                  APPROVE
                </Button>
              )}
            </td>
          </tr>
        ))}
        <Pagination>
          {[...Array(Math.ceil(filteredTransactions.length / itemsPerPage)).keys()].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === currentPage}
              onClick={() => paginate(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </>
    );
  };
  

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
               {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h1>All Payment Collection</h1>
          <Form>
            <Row>
              <Col md={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter student Admin Number"
                  value={searchQuery}
                  onChange={(e) => {
                    console.log("search data is ",e.target.value);
                    setSearchQuery(e.target.value)}
                  }
                              />
              </Col>
             
            </Row>
          </Form>

         <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Transaction Id</th>
                    <th>Admission No.</th>
                    <th>Student</th>

                    <th>Amount</th>
                    <th>Remaining</th>

                    <th>Approved</th>
                    <th>Payment Method</th>
                  
                    <th>Paid At</th>
                    <th>Approved At</th>

                    <th></th>

                  </tr>
                </thead>
                <tbody>
         {generateTransactionData()}

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
