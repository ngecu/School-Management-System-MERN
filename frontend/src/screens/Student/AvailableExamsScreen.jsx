// screens/Student/AvailableExamsScreen.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Badge, Row, Col, Container, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { getAvailableExams, bookExam } from '../../actions/examActions';
import { FaBook, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaClipboardCheck } from 'react-icons/fa';

const AvailableExamsScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const availableExams = useSelector(state => state.availableExams);
  const { loading, error, exams, eligibility } = availableExams || { loading: false, error: null, exams: [], eligibility: {} };

  useEffect(() => {
    if (userInfo) {
      dispatch(getAvailableExams());
    }
  }, [dispatch, userInfo]);

  const handleBookExam = (exam) => {
    setSelectedExam(exam);
    setShowBookingModal(true);
    setBookingError(null);
    setBookingSuccess(false);
  };

  const confirmBooking = async () => {
    if (!selectedExam) return;
    
    setBookingLoading(true);
    setBookingError(null);
    try {
      const result = await dispatch(bookExam(selectedExam._id));
      if (result && result.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          setShowBookingModal(false);
          history.push('/student/my_exam');
        }, 2000);
      }
    } catch (error) {
      setBookingError(error.message || 'Failed to book exam');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Topbar />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="row pt-3">
                <div className="col-12">
                  {/* Eligibility Status Card */}
                  {eligibility && (
                    <Card className="mb-4">
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <h6 className="mb-3">Exam Eligibility Status</h6>
                            <div className="d-flex align-items-center">
                              <Badge 
                                bg={eligibility.canRegister ? 'success' : 'danger'}
                                style={{ fontSize: '14px', padding: '8px 16px' }}
                              >
                                {eligibility.canRegister ? '✅ Eligible' : '❌ Not Eligible'}
                              </Badge>
                              {!eligibility.canRegister && (
                                <span className="ms-3 text-danger">{eligibility.message}</span>
                              )}
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="d-flex justify-content-around">
                              <div>
                                <small className="text-muted">Total Fees</small>
                                <p className="mb-0 fw-bold">Ksh.{eligibility.totalFees || 0}</p>
                              </div>
                              <div>
                                <small className="text-muted">Paid</small>
                                <p className="mb-0 fw-bold text-success">Ksh.{eligibility.paidAmount || 0}</p>
                              </div>
                              <div>
                                <small className="text-muted">Pending</small>
                                <p className="mb-0 fw-bold text-danger">Ksh.{eligibility.pendingAmount || 0}</p>
                              </div>
                              <div>
                                <small className="text-muted">Required (50%)</small>
                                <p className="mb-0 fw-bold">Ksh.{eligibility.fiftyPercentRequired || 0}</p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  )}

                  {/* Available Exams Table */}
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Available Exams</h5>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => history.push('/student/my_exam')}
                      >
                        My Bookings
                      </Button>
                    </div>
                    <div className="card-body">
                      {loading ? (
                        <Loader />
                      ) : error ? (
                        <Message variant="danger">{error}</Message>
                      ) : exams && exams.length > 0 ? (
                        <Table responsive striped bordered hover>
                          <thead>
                            <tr>
                              <th>Exam Title</th>
                              <th>Type</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Venue</th>
                              <th>Duration</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {exams.map((exam, index) => (
                              <tr key={index}>
                                <td><strong>{exam.title}</strong></td>
                                <td>{exam.examType?.name || 'N/A'}</td>
                                <td>
                                  <FaCalendarAlt className="me-1" />
                                  {exam.date ? new Date(exam.date).toLocaleDateString() : 'N/A'}
                                </td>
                                <td>
                                  <FaClock className="me-1" />
                                  {exam.startTime || '09:00 AM'}
                                </td>
                                <td>
                                  <FaMapMarkerAlt className="me-1" />
                                  {exam.venue || 'Main Hall'}
                                </td>
                                <td>{exam.duration || '3 hours'}</td>
                                <td>
                                  {exam.registered ? (
                                    <Badge bg="success">✅ Registered</Badge>
                                  ) : (
                                    <Badge bg="warning">Available</Badge>
                                  )}
                                </td>
                                <td>
                                  <Button
                                    variant={exam.registered ? 'secondary' : 'primary'}
                                    size="sm"
                                    onClick={() => handleBookExam(exam)}
                                    disabled={exam.registered || !eligibility.canRegister}
                                  >
                                    {exam.registered ? 'Registered' : 'Book Now'}
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <Message variant="info">No exams available for booking at this time.</Message>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookingError && <Message variant="danger">{bookingError}</Message>}
          {bookingSuccess ? (
            <div className="text-center py-4">
              <FaClipboardCheck style={{ fontSize: '48px', color: '#28a745' }} />
              <h5 className="mt-3">Booking Successful!</h5>
              <p>You have successfully booked the exam. Redirecting to your bookings...</p>
            </div>
          ) : (
            <>
              <h6 className="mb-3">Exam Details</h6>
              <div className="mb-3">
                <p><strong>Exam:</strong> {selectedExam?.title}</p>
                <p><strong>Date:</strong> {selectedExam?.date ? new Date(selectedExam.date).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Time:</strong> {selectedExam?.startTime || '09:00 AM'}</p>
                <p><strong>Venue:</strong> {selectedExam?.venue || 'Main Hall'}</p>
                <p><strong>Duration:</strong> {selectedExam?.duration || '3 hours'}</p>
              </div>
              <div className="alert alert-info">
                <FaBook className="me-2" />
                Please confirm your booking. This action is final and requires full fee payment.
              </div>
              <div className="alert alert-warning">
                <strong>Note:</strong> You must have paid all school fees to book this exam.
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!bookingSuccess && (
            <>
              <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={confirmBooking}
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvailableExamsScreen;