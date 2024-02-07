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
                    <th>Transaction Id</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                  
                    <th>Paid At</th>
                    <th></th>

                  </tr>
                </thead>
                <tbody>
                {paymentTransactions && paymentTransactions.map((transaction) => (
  <tr key={transaction._id}>
    <td>{transaction.transactionId}</td>
    <td>{transaction.amount}</td>
    <td>
      <span className={`badge ${transaction.approved != true ? 'badge-danger' : 'badge-success'}`}>
        {`${transaction.approved}`}
      </span>
    </td>
    <td>{transaction.paymentMethod}</td>
    <td>{transaction.createdAt}</td>
    <td>
      {/* View Button */}
      {/* <Button variant="info" size="sm" onClick={() => handleView(transaction.schoolFees._id)}>
        View
      </Button>{' '} */}
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
