import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Card, Pagination, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';   // ✅ FIX: standalone import

import Sidebar from './components/Sidebar';
import { deleteLecturer, listLecturers } from '../../actions/lecturerActions';
import Topbar from './components/Topbar';
import { Modal } from 'antd';
import { toggleUserActive } from '../../actions/userActions';


const AllLecturers = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lecturerData, setLecturerData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const showModal = (data) => {
    setLecturerData(data);
    setIsModalOpen(true);
  };

  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const toggleStatus = (userId) => {
    dispatch(toggleUserActive(userId));
  };

  const deleteHandler = (lecturerID) => {
    console.log('i am deleting');
    if (window.confirm('Are you sure')) {
      dispatch(deleteLecturer(lecturerID));
    }
  };

  const lecturerList = useSelector((state) => state.lecturerList);
  const { loading, error, lecturers } = lecturerList;

  const lecturerDelete = useSelector((state) => state.lecturerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = lecturerDelete;

  const userTogleActive = useSelector((state) => state.userTogleActive);
  const { success: successToggle } = userTogleActive;

  useEffect(() => {
    dispatch(listLecturers());
  }, [dispatch, successDelete, successToggle]);

  // --- Filtered list (shared by table + downloads) ---
  const filteredLecturers = (lecturers || []).filter(
    (lecturer) =>
      lecturer?.lecturer?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer?.lecturer?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer?.lecturer?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ============================================
  // 📥 DOWNLOAD HANDLERS
  // ============================================

  const headers = ['Name', 'Gender', 'School', 'Email', 'Status'];

  const getDownloadData = () =>
    filteredLecturers.map((l) => [
      `${l.lecturer?.firstName || ''} ${l.lecturer?.lastName || ''}`.trim(),
      l.lecturer?.gender || '',
      l.lecturer?.school?.name || '',
      l.lecturer?.email || '',
      l.user?.isActive ? 'Active' : 'Inactive',
    ]);

  // --- Download CSV ---
  const downloadCSV = () => {
    if (filteredLecturers.length === 0) {
      alert('No lecturers to download');
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
    link.download = `Lecturers_List_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // --- Download PDF ---
  const downloadPDF = () => {
    if (filteredLecturers.length === 0) {
      alert('No lecturers to download');
      return;
    }

    const doc = new jsPDF('landscape');
    doc.setFontSize(16);
    doc.text('All Lecturers List', 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    if (searchQuery) {
      doc.text(`Search filter: "${searchQuery}"`, 14, 34);
    }

    // ✅ FIX: use standalone autoTable(doc, options)
    autoTable(doc, {
      startY: searchQuery ? 40 : 35,
      head: [headers],
      body: getDownloadData(),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 8 },
    });

    doc.save(`Lecturers_List_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // ============================================
  // TABLE RENDER
  // ============================================

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generateLecturerData = () => {
    if (filteredLecturers.length === 0) {
      return (
        <tr>
          <td colSpan="6">
            <div className="alert alert-danger">No Lecturers found</div>
          </td>
        </tr>
      );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLecturers = filteredLecturers.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <>
        {currentLecturers.map((lecturer) => (
          <React.Fragment key={lecturer.lecturer?._id}>
            <tr>
              <td>
                {lecturer.lecturer?.firstName} {lecturer.lecturer?.lastName}
              </td>
              <td>{lecturer.lecturer?.gender}</td>
              <td>{lecturer.lecturer?.school?.name}</td>
              <td>{lecturer.lecturer?.email}</td>
              <td>
                {lecturer.user?.isActive ? (
                  <span className="badge badge-success">Active</span>
                ) : (
                  <span className="badge badge-danger">Inactive</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => showModal(lecturer.lecturer)}
                >
                  <i className="fas fa-folder"></i> View
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteHandler(lecturer.lecturer._id)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>

                {lecturer.user?.isActive ? (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => toggleStatus(lecturer.user._id)}
                  >
                    <i className="fas fa-times"></i> Deactivate
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => toggleStatus(lecturer.user._id)}
                  >
                    <i className="fas fa-check"></i> Activate
                  </button>
                )}
              </td>
            </tr>
          </React.Fragment>
        ))}

        {/* ✅ FIX: pagination inside the map's return fragment */}
        <tr>
          <td colSpan="6" style={{ border: 'none', background: 'transparent' }}>
            <Pagination className="justify-content-end mb-0">
              {[...Array(Math.ceil(filteredLecturers.length / itemsPerPage)).keys()].map(
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
          </td>
        </tr>
      </>
    );
  };

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
                      <h5 className="mb-0">All Lecturers Data</h5>
                      <div className="d-flex align-items-center">
                        <Form inline className="mr-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by name or email"
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
                          <th>Name</th>
                          <th>Gender</th>
                          <th>School</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
                        {generateLecturerData()}
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
        title="Lecturer Details"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {lecturerData && (
          <Row>
            <Col style={{ textAlign: 'center' }} md={12}>
              <img
                src={lecturerData.photo}
                alt="Lecturer"
                style={{ maxWidth: '100%' }}
              />
            </Col>

            <Col md={6}>
              <strong>National ID:</strong> {lecturerData.nationalID}
            </Col>
            <Col md={6}>
              <strong>School:</strong> {lecturerData.school?.name}
            </Col>
            <Col md={6}>
              <strong>Courses:</strong> {lecturerData.courses?.length ?? 0}
            </Col>
            <Col md={6}>
              <strong>Email:</strong> {lecturerData.email}
            </Col>

            <Col md={6}>
              <strong>First Name:</strong> {lecturerData.firstName}
            </Col>
            <Col md={6}>
              <strong>Last Name:</strong> {lecturerData.lastName}
            </Col>
            <Col md={6}>
              <strong>Gender:</strong> {lecturerData.gender}
            </Col>
            <Col md={6}>
              <strong>DOB:</strong>{' '}
              {lecturerData.dob && new Date(lecturerData.dob).toLocaleDateString()}
            </Col>
            <Col md={6}>
              <strong>Religion:</strong> {lecturerData.religion}
            </Col>
            <Col md={6}>
              <strong>Phone:</strong> {lecturerData.phone}
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default AllLecturers;