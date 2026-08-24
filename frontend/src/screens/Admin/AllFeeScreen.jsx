import React, { useState, useEffect, useRef } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container, Modal } from 'react-bootstrap';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const receiptRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllFees = useSelector((state) => state.getAllFees);
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

  // View Receipt Handler
  const handleViewReceipt = (fee) => {
    setSelectedFee(fee);
    setShowReceiptModal(true);
  };

  // Print Receipt Handler
  const handlePrintReceipt = () => {
    const printContent = receiptRef.current;
    const originalContents = document.body.innerHTML;
    
    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Fee Receipt</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
          <style>
            @media print {
              body { 
                padding: 20px;
                font-family: Arial, sans-serif;
              }
              .no-print { display: none; }
              .receipt-container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border: 1px solid #ddd;
              }
              .receipt-header {
                text-align: center;
                border-bottom: 2px solid #000;
                padding-bottom: 20px;
                margin-bottom: 20px;
              }
              .receipt-header img {
                max-width: 120px;
                margin-bottom: 10px;
              }
              .receipt-header h2 {
                margin: 0;
                color: #2c3e50;
              }
              .receipt-header p {
                margin: 0;
                color: #7f8c8d;
              }
              .receipt-details {
                margin: 20px 0;
              }
              .receipt-details table {
                width: 100%;
              }
              .receipt-details td {
                padding: 8px;
              }
              .receipt-footer {
                margin-top: 30px;
                text-align: center;
                border-top: 1px solid #ddd;
                padding-top: 20px;
              }
              .status-badge {
                display: inline-block;
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
              }
              .status-paid {
                background: #27ae60;
                color: white;
              }
              .status-pending {
                background: #e74c3c;
                color: white;
              }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const filteredFees = fees.filter((fee) =>
    fee.student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fee.student?.admissionNumber?.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(AllFees());
    }
  }, [dispatch, userInfo]);

  // Receipt Modal Component
  const ReceiptModal = ({ show, handleClose, fee }) => {
    if (!fee) return null;

    return (
      <Modal 
        show={show} 
        onHide={handleClose} 
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Fee Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={receiptRef} className="receipt-container">
            {/* Receipt Header with Logo */}
            <div className="receipt-header" style={{ textAlign: 'center' }}>
              <img 
                src="https://raw.githubusercontent.com/ngecu/PHP-School-Management-System/main/img/logo/attnlg.jpg" // Replace with your actual logo path
                alt="School Logo" 
                style={{ maxWidth: '120px' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24"%3E%3Cpath d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="%232c3e50"/%3E%3C/svg%3E';
                }}
              />
              <h2>Eve Sms</h2>
              <p>123 Education Street, City, State - 123456</p>
              <p>Phone: +1 234 567 8900 | Email: info@school.com</p>
            </div>

            <h4 className="text-center mb-4">Fee Payment Receipt</h4>
            
            <div className="receipt-details">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td><strong>Receipt No:</strong></td>
                    <td>#REC-{fee._id?.slice(-6) || '000001'}</td>
                    <td><strong>Date:</strong></td>
                    <td>{new Date(fee.createdAt || Date.now()).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Student Name:</strong></td>
                    <td>{fee.student?.firstName} {fee.student?.lastName}</td>
                    <td><strong>Admission No:</strong></td>
                    <td>{fee.student?.admissionNumber}</td>
                  </tr>
                  <tr>
                    <td><strong>Course:</strong></td>
                    <td>{fee.student?.course?.name || 'N/A'}</td>
                    <td><strong>Year of Study:</strong></td>
                    <td>{fee.student?.yearOfStudy || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Fee Type:</strong></td>
                    <td>{fee.feeType || 'Tuition Fee'}</td>
                    <td><strong>Amount:</strong></td>
                    <td><strong>KSH {fee.amount?.toLocaleString() || 0}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td colSpan="3">
                      <span className={`status-badge ${fee.status === 'Paid' ? 'status-paid' : 'status-pending'}`}>
                        {fee.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                  {fee.paymentMethod && (
                    <tr>
                      <td><strong>Payment Method:</strong></td>
                      <td colSpan="3">{fee.paymentMethod}</td>
                    </tr>
                  )}
                  {fee.transactionId && (
                    <tr>
                      <td><strong>Transaction ID:</strong></td>
                      <td colSpan="3">{fee.transactionId}</td>
                    </tr>
                  )}
                  {fee.description && (
                    <tr>
                      <td><strong>Description:</strong></td>
                      <td colSpan="3">{fee.description}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="receipt-footer">
              <p><strong>Thank you for your payment!</strong></p>
              <p style={{ fontSize: '12px', color: '#7f8c8d' }}>
                This is a computer-generated receipt. No signature required.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePrintReceipt}>
            <i className="fas fa-print"></i> Print Receipt
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Topbar/>
        <Sidebar />
        
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="content-wrapper">
            <section className="content">
              <div className="container-fluid">
                <div className="row pt-3">
                  <div className="col-xl-12 col-md-12 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h1>All Fees Collection</h1>
                          <Button 
                            variant="success"
                            onClick={() => {
                              const feeToPrint = fees[0]; // Or pass specific fee
                              if (feeToPrint) handleViewReceipt(feeToPrint);
                            }}
                          >
                            <i className="fas fa-print"></i> Print All
                          </Button>
                        </div>
                        
                        <Form>
                          <Row>
                            <Col md={12}>
                              <Form.Control
                                type="text"
                                placeholder="Search By Admission No."
                                className="mr-2"
                                value={searchQuery}
                                onChange={(e) => {
                                  console.log("search data is ", e.target.value);
                                  setSearchQuery(e.target.value);
                                }}
                              />
                            </Col>
                          </Row>
                        </Form>
                        
                        <Table striped bordered hover responsive className="table-sm mt-3">
                          <thead>
                            <tr>
                              <th>Admission No</th>
                              <th>Student Name</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredFees.map((fee) => (
                              <tr key={fee._id}>
                                <td>{fee.student?.admissionNumber}</td>
                                <td>{fee.student?.firstName} {fee.student?.lastName}</td>
                                <td>KSH {fee.amount?.toLocaleString()}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      fee.status === 'Pending' ? 'badge-danger' : 'badge-success'
                                    }`}
                                  >
                                    {fee.status}
                                  </span>
                                </td>
                                <td>
                                  <Button
                                    variant="info"
                                    size="sm"
                                    className="mr-1"
                                    onClick={() => handleViewReceipt(fee)}
                                  >
                                    <i className="fas fa-eye"></i> View
                                  </Button>
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedFee(fee);
                                      setTimeout(handlePrintReceipt, 500);
                                    }}
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        show={showReceiptModal}
        handleClose={() => {
          setShowReceiptModal(false);
          setSelectedFee(null);
        }}
        fee={selectedFee}
      />
    </div>
  );
};

export default AdminFeeScreen;