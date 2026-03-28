import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Pagination, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { Modal, Select, Input, message as antMessage } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Sidebar from './components/Sidebar';
import { AllFees } from '../../actions/feeActions';
import Topbar from './components/Topbar';
import axios from 'axios';
import { FaMoneyBillWave, FaMobileAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const { Option } = Select;

const AccountantFeeScreen = () => {
  const dispatch = useDispatch();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllFees = useSelector((state) => state.getAllFees);
  const { loading, error, fees } = getAllFees;

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(AllFees());
    }
  }, [dispatch, userInfo]);

  const handlePaymentClick = (fee) => {
    setSelectedFee(fee);
    const remaining = (fee.amount || 0) - (fee.paidAmount || 0);
    setPaymentAmount(remaining > 0 ? remaining : 0);
    setPhoneNumber('');
    setPaymentStatus(null);
    setShowPaymentModal(true);
  };

  const handleModalClose = () => {
    setShowPaymentModal(false);
    setSelectedFee(null);
    setPaymentStatus(null);
    setPaymentLoading(false);
  };

  const initiateMPESAPayment = async () => {
    if (!phoneNumber) {
      antMessage.error('Please enter phone number');
      return;
    }

    if (!paymentAmount || paymentAmount <= 0) {
      antMessage.error('Please enter a valid amount');
      return;
    }

    // Format phone number (remove leading 0 or +254)
    let formattedPhone = phoneNumber.toString().trim();
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('+254')) {
      formattedPhone = formattedPhone.substring(1);
    }

    setPaymentLoading(true);
    setPaymentStatus(null);

    try {
      const response = await axios.post('http://localhost:5000/api/payment', {
        phone: formattedPhone,
        amount: paymentAmount,
        schoolFeeId: selectedFee._id,
        accountReference: selectedFee.student?.admissionNumber,
        transactionDesc: `Fee Payment for ${selectedFee.student?.firstName} ${selectedFee.student?.lastName}`
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });

      if (response.data) {
        setPaymentStatus({
          type: 'info',
          message: 'STK Push sent to your phone. Please enter your PIN to complete payment.'
        });
        
        // Poll for payment confirmation
        pollPaymentStatus(response.data.CheckoutRequestID);
      }
    } catch (error) {
      console.error('Payment error:', error);
      antMessage.error(error.response?.data?.message || 'Payment initiation failed. Please try again.');
      setPaymentLoading(false);
    }
  };

  const pollPaymentStatus = async (checkoutId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/mpesa/confirmPayment/${checkoutId}`, {}, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        });

        if (response.data.ResultCode === 0) {
          clearInterval(interval);
          antMessage.success('Payment successful! Fee has been updated.');
          setPaymentLoading(false);
          
          // Refresh fees list
          setTimeout(() => {
            dispatch(AllFees());
            handleModalClose();
          }, 2000);
        } else if (response.data.ResultCode !== 1037) { // 1037 means pending
          clearInterval(interval);
          antMessage.error(response.data.ResultDesc || 'Payment failed. Please try again.');
          setPaymentLoading(false);
        }
      } catch (error) {
        console.error('Status check error:', error);
      }
    }, 3000); // Check every 3 seconds

    // Stop polling after 2 minutes
    setTimeout(() => {
      clearInterval(interval);
      if (paymentStatus?.type !== 'success') {
        antMessage.warning('Payment is taking longer than expected. Please check your M-Pesa messages.');
        setPaymentLoading(false);
      }
    }, 120000);
  };

  const generateQRCode = async () => {
    if (!selectedFee) return;
    
    setPaymentLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/mpesa/qrcode', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        },
        params: {
          amount: paymentAmount,
          reference: selectedFee.student?.admissionNumber
        }
      });
      
      if (response.data) {
        setQrCode(response.data);
        setShowQRModal(true);
        setPaymentLoading(false);
      }
    } catch (error) {
      console.error('QR code error:', error);
      antMessage.error('Failed to generate QR code');
      setPaymentLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <Badge bg="success">PAID</Badge>;
      case 'partial':
        return <Badge bg="warning">PARTIAL</Badge>;
      case 'pending':
        return <Badge bg="danger">PENDING</Badge>;
      default:
        return <Badge bg="secondary">{status || 'PENDING'}</Badge>;
    }
  };

  const calculateRemaining = (fee) => {
    if (!fee) return 0;
    const paid = fee.paidAmount || 0;
    const remaining = (fee.amount || 0) - paid;
    return remaining > 0 ? remaining : 0;
  };

  const generateFeeData = () => {
    if (!fees || fees.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center py-5">
            <div className="text-muted">
              <FaMoneyBillWave size={48} className="mb-3" />
              <h6>No fee records found</h6>
              <p className="small">No students have been assigned fees yet</p>
            </div>
           </td>
         </tr>
      );
    }

    const filteredStudents = fees.filter(
      (student) =>
        student.student?.admissionNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map((student) => (
      <tr key={student._id}>
        <td>
          <strong>{student.student?.admissionNumber || 'N/A'}</strong>
        </td>
        <td>
          <div>{student.student?.firstName} {student.student?.lastName}</div>
          <small className="text-muted">{student.student?.email}</small>
        </td>
        <td className="text-end">
          <div><strong>KSH {(student.amount || 0).toLocaleString()}</strong></div>
          {(student.paidAmount || 0) > 0 && (
            <small className="text-success">Paid: KSH {(student.paidAmount || 0).toLocaleString()}</small>
          )}
        </td>
        <td className="text-end">
          <div className="text-warning">KSH {calculateRemaining(student).toLocaleString()}</div>
          <small className="text-muted">Remaining</small>
        </td>
        <td>{getStatusBadge(student.status)}</td>
        <td>{student.dueDate ? new Date(student.dueDate).toLocaleDateString() : 'N/A'}</td>
        <td>{student.updatedAt ? new Date(student.updatedAt).toLocaleDateString() : 'N/A'}</td>
        <td>
          {calculateRemaining(student) > 0 ? (
            <Button
              variant="success"
              size="sm"
              onClick={() => handlePaymentClick(student)}
              className="px-3"
            >
              <FaMoneyBillWave className="me-1" /> Pay Now
            </Button>
          ) : (
            <Badge bg="success" className="p-2">Fully Paid</Badge>
          )}
        </td>
      </tr>
    ));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil((fees?.length || 0) / itemsPerPage);

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Topbar />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="row pt-3">
                <div className="col-xl-12 col-md-12 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">
                          <FaMoneyBillWave className="me-2 text-primary" />
                          Fee Collection Management
                        </h4>
                        <div className="text-muted">
                          Total Outstanding: KSH{' '}
                          {fees?.reduce((sum, fee) => sum + calculateRemaining(fee), 0)?.toLocaleString() || 0}
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      {loading ? (
                        <Loader />
                      ) : error ? (
                        <Message variant="danger">{error}</Message>
                      ) : (
                        <>
                          <Form className="mb-4">
                            <Row>
                              <Col md={12}>
                                <Form.Control
                                  type="text"
                                  placeholder="Search by admission number, student name or email..."
                                  value={searchQuery}
                                  onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                  }}
                                />
                              </Col>
                            </Row>
                          </Form>

                          <div className="table-responsive">
                            <Table striped bordered hover responsive className="table-sm">
                              <thead className="bg-light">
                                <tr>
                                  <th>Admission No.</th>
                                  <th>Student</th>
                                  <th className="text-end">Total Amount</th>
                                  <th className="text-end">Remaining</th>
                                  <th>Status</th>
                                  <th>Due Date</th>
                                  <th>Updated At</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {generateFeeData()}
                              </tbody>
                            </Table>
                          </div>

                          {fees?.length > 0 && totalPages > 1 && (
                            <div className="d-flex justify-content-between align-items-center mt-3">
                              <div className="text-muted small">
                                Showing {Math.min(currentPage * itemsPerPage, fees.length)} of {fees.length} records
                              </div>
                              <Pagination>
                                <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                                {[...Array(Math.min(totalPages, 5)).keys()].map((num) => {
                                  let pageNum;
                                  if (totalPages <= 5) {
                                    pageNum = num + 1;
                                  } else if (currentPage <= 3) {
                                    pageNum = num + 1;
                                  } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + num;
                                  } else {
                                    pageNum = currentPage - 2 + num;
                                  }
                                  return (
                                    <Pagination.Item
                                      key={pageNum}
                                      active={pageNum === currentPage}
                                      onClick={() => paginate(pageNum)}
                                    >
                                      {pageNum}
                                    </Pagination.Item>
                                  );
                                })}
                                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                                <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                              </Pagination>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Payment Modal using Ant Design */}
      <Modal
        title={
          <div>
            <FaMoneyBillWave className="me-2" />
            Make Payment
          </div>
        }
        open={showPaymentModal}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        centered
      >
        {selectedFee && (
          <div>
            <div className="mb-4 p-3 bg-light rounded">
              <Row>
                <Col md={6}>
                  <strong>Student:</strong> {selectedFee.student?.firstName} {selectedFee.student?.lastName}<br />
                  <strong>Admission No:</strong> {selectedFee.student?.admissionNumber}
                </Col>
                <Col md={6}>
                  <strong>Total Amount:</strong> KSH {(selectedFee.amount || 0).toLocaleString()}<br />
                  <strong>Amount Paid:</strong> KSH {(selectedFee.paidAmount || 0).toLocaleString()}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={6}>
                  <strong className="text-success">Remaining Balance:</strong>
                </Col>
                <Col md={6}>
                  <h4 className="text-warning mb-0">
                    KSH {calculateRemaining(selectedFee).toLocaleString()}
                  </h4>
                </Col>
              </Row>
            </div>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Select
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  style={{ width: '100%' }}
                  size="large"
                >
                  <Option value="mpesa">M-Pesa (STK Push)</Option>
                  <Option value="mpesa_qr">M-Pesa (QR Code)</Option>
                  <Option value="bank">Bank Transfer</Option>
                  <Option value="cash">Cash</Option>
                </Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount to Pay (KSH)</Form.Label>
                <Form.Control
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  min="1"
                  max={calculateRemaining(selectedFee)}
                  className="form-control-lg"
                />
                <Form.Text className="text-muted">
                  Maximum: KSH {calculateRemaining(selectedFee).toLocaleString()}
                </Form.Text>
              </Form.Group>

              {(paymentMethod === 'mpesa' || paymentMethod === 'mpesa_qr') && (
                <Form.Group className="mb-3">
                  <Form.Label>M-Pesa Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="e.g., 0712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="form-control-lg"
                  />
                  <Form.Text className="text-muted">
                    Enter the phone number registered with M-Pesa
                  </Form.Text>
                </Form.Group>
              )}

              {paymentLoading && (
                <div className="text-center py-3">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Processing payment...</p>
                </div>
              )}
            </Form>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={handleModalClose}>
                Cancel
              </Button>
              {paymentMethod === 'mpesa' && !paymentLoading && (
                <Button
                  variant="success"
                  onClick={initiateMPESAPayment}
                  disabled={!phoneNumber || !paymentAmount || paymentAmount <= 0}
                >
                  <FaMobileAlt className="me-1" /> Pay with M-Pesa
                </Button>
              )}
              {paymentMethod === 'mpesa_qr' && !paymentLoading && (
                <Button
                  variant="success"
                  onClick={generateQRCode}
                  disabled={!phoneNumber || !paymentAmount || paymentAmount <= 0}
                >
                  Generate QR Code
                </Button>
              )}
              {paymentMethod === 'bank' && (
                <Button
                  variant="info"
                  onClick={() => {
                    antMessage.info('Bank Transfer Details: Equity Bank, Account: 1234567890, Branch: CBD');
                  }}
                >
                  Get Bank Details
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* QR Code Modal using Ant Design */}
      <Modal
        title="Scan QR Code to Pay"
        open={showQRModal}
        onCancel={() => setShowQRModal(false)}
        footer={null}
        centered
      >
        {qrCode && (
          <div className="text-center">
            <img src={qrCode} alt="Payment QR Code" className="img-fluid mb-3" style={{ maxWidth: '250px' }} />
            <p className="text-muted">Scan this QR code with your M-Pesa app to complete payment</p>
            <Alert variant="info">
              Amount: KSH {(paymentAmount || 0).toLocaleString()}<br />
              Reference: {selectedFee?.student?.admissionNumber}
            </Alert>
            <Button variant="secondary" onClick={() => setShowQRModal(false)} className="mt-3">
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AccountantFeeScreen;