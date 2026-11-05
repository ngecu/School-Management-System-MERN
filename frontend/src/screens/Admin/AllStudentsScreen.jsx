import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Card, Pagination, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import Sidebar from './components/Sidebar';
import { deleteStudent, listStudents } from '../../actions/studentActions';
import Topbar from './components/Topbar';
import { Modal } from 'antd';
import { toggleUserActive } from '../../actions/userActions';


const AllStudents = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const showModal = (data) => {
    setStudentData(data);
    setIsModalOpen(true);
  };

  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const deleteHandler = (studentID) => {
    console.log('i am deleting');
    if (window.confirm('Are you sure')) {
      dispatch(deleteStudent(studentID));
    }
  };

  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;

  const studentDelete = useSelector((state) => state.studentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = studentDelete;

  const userTogleActive = useSelector((state) => state.userTogleActive);
  const { success: successToggle } = userTogleActive;

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch, successDelete, successToggle]);

  const toggleStatus = (userId) => {
    dispatch(toggleUserActive(userId));
  };

  // --- Filtered list (shared by table + downloads) ---
  const filteredStudents = (students || []).filter(
    (student) =>
      student?.student?.admissionNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.student?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.student?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ============================================
  // 📥 DOWNLOAD HANDLERS
  // ============================================

  const getDownloadData = () =>
    filteredStudents.map((s) => [
      s.student?.admissionNumber || '',
      `${s.student?.firstName || ''} ${s.student?.lastName || ''}`.trim(),
      s.student?.gender || '',
      s.student?.course?.name || '',
      s.student?.email || '',
      s.student?.dob ? new Date(s.student.dob).toLocaleDateString() : '',
      s.user?.isActive ? 'Active' : 'Inactive',
    ]);

  const headers = ['Admission No.', 'Name', 'Gender', 'Course', 'Email', 'DOB', 'Status'];

  // --- Download CSV ---
  const downloadCSV = () => {
    if (filteredStudents.length === 0) {
      alert('No students to download');
      return;
    }

    const rows = getDownloadData();
    const csvContent = [
      headers.map((h) => `"${h}"`).join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Students_List_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // --- Download PDF ---
  const downloadPDF = () => {
  if (filteredStudents.length === 0) {
    alert('No students to download');
    return;
  }

  const doc = new jsPDF('landscape');
  doc.setFontSize(16);
  doc.text('All Students List', 14, 20);

  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
  if (searchQuery) {
    doc.text(`Search filter: "${searchQuery}"`, 14, 34);
  }

  // ✅ Call autoTable as a function, passing doc as first arg
  autoTable(doc, {
    startY: searchQuery ? 40 : 35,
    head: [headers],
    body: getDownloadData(),
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 8 },
  });

  doc.save(`Students_List_${new Date().toISOString().split('T')[0]}.pdf`);
};

  // ============================================
  // TABLE RENDER
  // ============================================

  const generateStudentData = () => {
    if (filteredStudents.length === 0) {
      return (
        <tr>
          <td colSpan="8">
            <div className="alert alert-danger">No students found</div>
          </td>
        </tr>
      );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <>
        {currentItems.map((student) => (
          <React.Fragment key={student?._id}>
            <tr key={student.student?._id}>
              <td>{student.student?.admissionNumber} </td>
              <td>
                {student.student?.firstName} {student.student?.lastName}
              </td>
              <td>{student.student?.gender}</td>
              <td>{student.student?.course?.name}</td>
              <td>{student.student?.email}</td>
              <td>
                {student.student?.dob &&
                  new Date(student.student.dob).toLocaleDateString()}
              </td>
              <td>
                {student.user?.isActive ? (
                  <span className="badge badge-success">Active</span>
                ) : (
                  <span className="badge badge-danger">Inactive</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => showModal(student.student)}
                >
                  <i className="fas fa-folder"></i> View
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteHandler(student.student._id)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
                {student.user?.isActive ? (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => toggleStatus(student.user._id)}
                  >
                    <i className="fas fa-times"></i> Deactivate
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => toggleStatus(student.user._id)}
                  >
                    <i className="fas fa-check"></i> Activate
                  </button>
                )}
              </td>
            </tr>
          </React.Fragment>
        ))}
        <Pagination>
          {[...Array(Math.ceil(filteredStudents.length / itemsPerPage)).keys()].map(
            (pageNumber) => (
              <Pagination.Item
                key={pageNumber + 1}
                active={pageNumber + 1 === currentPage}
                onClick={() => paginate(pageNumber + 1)}
              >
                {pageNumber + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </>
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Topbar />
        <Sidebar />

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="content-wrapper">
            <section className="content">
              <div className="container-fluid">
                <Card>
                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <h5 className="mb-0">All Students Data</h5>
                      <div className="d-flex align-items-center">
                        <Form inline className="mr-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by Admission No."
                            className="mr-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </Form>
                        <ButtonGroup size="sm">
                          <Button variant="success" onClick={downloadCSV}>
                            <i className="fas fa-file-csv"></i> CSV
                          </Button>
                          <Button variant="danger" onClick={downloadPDF}>
                            <i className="fas fa-file-pdf"></i> PDF
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Table bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Admission No.</th>
                          <th>Name</th>
                          <th>Gender</th>
                          <th>Course</th>
                          <th>Email</th>
                          <th>Date Of Birth</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
                        {generateStudentData()}
                      </tbody>
                    </Table>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-flex justify-content-end"></div>
                  </Card.Footer>
                </Card>
              </div>
            </section>
          </div>
        )}
      </div>

      <Modal
        title={`Student Details (${studentData?.admissionNumber})`}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {studentData && (
          <Row>
            <Col style={{ textAlign: 'center' }} md={12}>
              <img src={studentData.photo} alt="Student" style={{ maxWidth: '100%' }} />
            </Col>

            <Col md={6}>
              <strong>National ID:</strong> {studentData.nationalID}
            </Col>
            <Col md={6}>
              <strong>Year of Study:</strong> {studentData.yearOfStudy}
            </Col>
            <Col md={6}>
              <strong>Course:</strong> {studentData.course.name}
            </Col>
            <Col md={6}>
              <strong>Email:</strong> {studentData.email}
            </Col>

            <Col md={6}>
              <strong>First Name:</strong> {studentData.firstName}
            </Col>
            <Col md={6}>
              <strong>Last Name:</strong> {studentData.lastName}
            </Col>
            <Col md={6}>
              <strong>Gender:</strong> {studentData.gender}
            </Col>
            <Col md={6}>
              <strong>DOB:</strong>{' '}
              {studentData.dob && new Date(studentData.dob).toLocaleDateString()}
            </Col>
            <Col md={6}>
              <strong>Religion:</strong> {studentData.religion}
            </Col>
            <Col md={6}>
              <strong>Phone:</strong> {studentData.phone}
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default AllStudents;