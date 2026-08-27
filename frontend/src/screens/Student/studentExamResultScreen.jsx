import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container, Modal, Card, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { getExamResultsByStudents } from '../../actions/examResultActions';
import { bookExam, getMyExamBookings, getExamCard } from '../../actions/examActions';
import { QRCodeCanvas } from 'qrcode.react';
import './ExamCard.css';

const StudentExamResultScreen = () => {
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  const dispatch = useDispatch();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showExamCardModal, setShowExamCardModal] = useState(false);
  const [examCardData, setExamCardData] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const examResultsByStudents = useSelector(state => state.examResultsByStudents);
  const { loading, error, examResults } = examResultsByStudents || { loading: false, error: null, examResults: [] };

  // Fix: Add fallback for undefined examBookings
  const examBookings = useSelector(state => state.examBookings) || { loading: false, bookings: [] };
  const { loading: bookingsLoading, bookings } = examBookings;

  const students = userInfo?.userData?._id ? [userInfo.userData._id] : [];

  useEffect(() => {
    if (userInfo && students.length > 0) {
      dispatch(getExamResultsByStudents(students));
      dispatch(getMyExamBookings());
    }
  }, [dispatch, userInfo, students.length]);

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
        // Show exam card after successful booking
        setTimeout(() => {
          setShowBookingModal(false);
          if (selectedExam) {
            handleViewExamCard(selectedExam._id);
          }
        }, 1500);
      }
    } catch (error) {
      setBookingError(error.message || 'Failed to book exam');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleViewExamCard = async (examId) => {
    if (!examId) return;
    
    try {
      const result = await dispatch(getExamCard(examId));
      if (result && result.success) {
        setExamCardData(result.data?.examCard || null);
        setQrCode(result.data?.qrCode || null);
        setShowExamCardModal(true);
      }
    } catch (error) {
      console.error('Failed to get exam card:', error);
      setBookingError('Failed to load exam card. Please try again.');
    }
  };

  const handlePrintExamCard = () => {
    const printContent = document.getElementById('exam-card-content');
    if (!printContent) return;
    
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
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
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">My Exam Results & Bookings</h5>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => history.push('/student/available-exams')}
                      >
                        Book New Exam
                      </Button>
                    </div>
                    <div className="card-body">
                      {loading ? (
                        <Loader />
                      ) : error ? (
                        <Message variant="danger">{error}</Message>
                      ) : examResults && examResults.length > 0 ? (
                        <Table responsive striped bordered hover>
                          <thead>
                            <tr>
                              <th>Exam Type</th>
                              <th>Title</th>
                              <th>Marks</th>
                              <th>Grade</th>
                              <th>Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {examResults.map((result, index) => (
                              <tr key={index}>
                                <td>{result.exam?.examType || 'N/A'}</td>
                                <td>{result.exam?.title || 'N/A'}</td>
                                <td>{result.marksObtained || 0}</td>
                                <td>
                                  <Badge bg={result.grade === 'F' ? 'danger' : 'success'}>
                                    {result.grade || 'PENDING'}
                                  </Badge>
                                </td>
                                <td>{result.exam?.date ? new Date(result.exam.date).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                  <Badge bg="success">Completed</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <Message variant="info">No exam results available</Message>
                      )}
                    </div>
                  </div>

                  {/* Show Bookings Section */}
                  {bookings && bookings.length > 0 && (
                    <div className="card mt-3">
                      <div className="card-header">
                        <h5 className="mb-0">My Exam Bookings</h5>
                      </div>
                      <div className="card-body">
                        <Table responsive striped bordered hover>
                          <thead>
                            <tr>
                              <th>Exam Title</th>
                              <th>Booking Reference</th>
                              <th>Status</th>
                              <th>Booking Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.map((booking, index) => (
                              <tr key={index}>
                                <td>{booking.exam?.title || 'N/A'}</td>
                                <td>{booking.bookingReference}</td>
                                <td>
                                  <Badge bg={
                                    booking.status === 'Confirmed' ? 'success' : 
                                    booking.status === 'Cancelled' ? 'danger' : 
                                    'warning'
                                  }>
                                    {booking.status || 'Pending'}
                                  </Badge>
                                </td>
                                <td>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                  <Button 
                                    variant="info" 
                                    size="sm"
                                    onClick={() => handleViewExamCard(booking.exam?._id)}
                                    disabled={!booking.exam}
                                  >
                                    View Exam Card
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  )}
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
            <div className="text-center">
              <div className="mb-3">
                <i className="fas fa-check-circle" style={{ fontSize: '48px', color: '#28a745' }}></i>
              </div>
              <h5>Booking Successful!</h5>
              <p>You have successfully booked the exam. Your exam card is being generated...</p>
            </div>
          ) : (
            <>
              <p><strong>Exam:</strong> {selectedExam?.title || 'N/A'}</p>
              <p><strong>Date:</strong> {selectedExam?.date ? new Date(selectedExam.date).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Venue:</strong> {selectedExam?.venue || 'Main Hall'}</p>
              <div className="alert alert-info">
                <i className="fas fa-info-circle"></i> Please confirm your booking. This action is final and requires full fee payment.
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

      {/* Exam Card Modal */}
      <Modal 
        show={showExamCardModal} 
        onHide={() => setShowExamCardModal(false)} 
        size="lg"
        centered
        className="exam-card-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Exam Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="exam-card-content">
            <div className="exam-card">
              <div className="exam-card-header">
                <div className="school-logo">
                  <img src="/logo.png" alt="School Logo" className="logo-img" />
                </div>
                <div className="school-info">
                  <h3>School Management System</h3>
                  <p>Examination Department</p>
                </div>
              </div>

              <div className="exam-card-body">
                <h4 className="exam-title">{examCardData?.examTitle || 'Exam Card'}</h4>
                <div className="exam-details">
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Booking Reference:</strong> {examCardData?.bookingReference || 'N/A'}</p>
                      <p><strong>Student Name:</strong> {examCardData?.studentName || 'N/A'}</p>
                      <p><strong>Student ID:</strong> {examCardData?.studentId || 'N/A'}</p>
                      <p><strong>Registration Number:</strong> {examCardData?.registrationNumber || 'N/A'}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Course:</strong> {examCardData?.course || 'N/A'}</p>
                      <p><strong>School:</strong> {examCardData?.school || 'N/A'}</p>
                      <p><strong>Exam Type:</strong> {examCardData?.examType || 'N/A'}</p>
                      <p><strong>Duration:</strong> {examCardData?.duration || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <p><strong>Exam Date:</strong> {examCardData?.examDate || 'N/A'}</p>
                      <p><strong>Exam Time:</strong> {examCardData?.examTime || 'N/A'}</p>
                      <p><strong>Venue:</strong> {examCardData?.venue || 'N/A'}</p>
                      <p><strong>Booking Date:</strong> {examCardData?.bookingDate || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="qr-code-section">
                  {qrCode ? (
                    <img src={qrCode} alt="QR Code" className="qr-code" />
                  ) : (
                    <p>QR Code not available</p>
                  )}
                  <p className="qr-code-text">Scan QR for verification</p>
                </div>
              </div>

              <div className="exam-card-footer">
                <div className="signature-section">
                  <p>Examination Officer Signature: ___________________</p>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="terms">
                  <small>• This card is valid only for the exam date and time specified.</small>
                  <br />
                  <small>• Students must present this card at the examination hall.</small>
                  <br />
                  <small>• No electronic devices are allowed during the exam.</small>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExamCardModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePrintExamCard}>
            <i className="fas fa-print"></i> Print Exam Card
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentExamResultScreen;