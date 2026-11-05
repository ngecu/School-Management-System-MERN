import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Card, Pagination, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';  // ✅ standalone API

import { listAccountants, deleteAccountant } from '../../actions/accountantActions';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { toggleUserActive } from '../../actions/userActions';

const AllAccountants = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountantData, setAccountantData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const accountantList = useSelector((state) => state.accountantList);
  const { loading, error, accountants } = accountantList;

  const accountantDelete = useSelector((state) => state.accountantDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = accountantDelete;

  const userTogleActive = useSelector((state) => state.userTogleActive);
  const { success: successToggle } = userTogleActive;

  useEffect(() => {
    dispatch(listAccountants());
  }, [dispatch, successToggle, successDelete]);

  const handleToggleSuccess = () => {
    dispatch({ type: 'USER_TOGGLE_SUCCESS_RESET' });
  };

  const showModal = (data) => {
    console.log('show modal ', data);
    setAccountantData(data);
    setIsModalOpen(true);
  };

  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const deleteHandler = (accountId) => {
    if (window.confirm('Are you sure you want to delete this accountant?')) {
      dispatch(deleteAccountant(accountId));
    }
  };

  const toggleStatus = (userId) => {
    console.log(userId);
    dispatch(toggleUserActive(userId));
  };

  // --- Filtered list (shared by table + downloads) ---
  const filteredAccountants = (accountants || []).filter(
    (accountant) =>
      accountant?.accountant?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      accountant?.accountant?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      accountant?.accountant?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ============================================
  // 📥 DOWNLOAD HANDLERS
  // ============================================

  const headers = ['Name', 'Gender', 'Email', 'DOB', 'Status'];

  const getDownloadData = () =>
    filteredAccountants.map((a) => [
      `${a.accountant?.firstName || ''} ${a.accountant?.lastName || ''}`.trim(),
      a.accountant?.gender || '',
      a.accountant?.email || '',
      a.accountant?.dob ? new Date(a.accountant.dob).toLocaleDateString() : '',
      a.user?.isActive ? 'Active' : 'Inactive',
    ]);

  // --- Download CSV ---
  const downloadCSV = () => {
    if (filteredAccountants.length === 0) {
      alert('No accountants to download');
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
    link.download = `Accountants_List_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // --- Download PDF ---
  const downloadPDF = () => {
    if (filteredAccountants.length === 0) {
      alert('No accountants to download');
      return;
    }

    const doc = new jsPDF('landscape');
    doc.setFontSize(16);
    doc.text('All Accountants List', 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    if (searchQuery) {
      doc.text(`Search filter: "${searchQuery}"`, 14, 34);
    }

    // ✅ Standalone autoTable
    autoTable(doc, {
      startY: searchQuery ? 40 : 35,
      head: [headers],
      body: getDownloadData(),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 8 },
    });

    doc.save(`Accountants_List_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // ============================================
  // TABLE RENDER
  // ============================================

  const generateAccountantData = () => {
    if (filteredAccountants.length === 0) {
      return (
        <tr>
          <td colSpan="6">
            <div className="alert alert-danger">No accountants found</div>
          </td>
        </tr>
      );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAccountants.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <>
        {currentItems.map((accountant) => (
          <tr key={accountant._id}>
            <td>
              {accountant.accountant?.firstName} {accountant.accountant?.lastName}
            </td>
            <td>{accountant.accountant?.gender}</td>
            <td>{accountant.accountant?.email}</td>
            <td>
              {accountant.accountant?.dob &&
                new Date(accountant.accountant.dob).toLocaleDateString()}
            </td>
            <td>
              {accountant.user?.isActive ? (
                <span className="badge badge-success">Active</span>
              ) : (
                <span className="badge badge-danger">Inactive</span>
              )}
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteHandler(accountant.accountant._id)}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
              {accountant.user?.isActive ? (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => toggleStatus(accountant.user._id)}
                >
                  <i className="fas fa-times"></i> Deactivate
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => toggleStatus(accountant.user._id)}
                >
                  <i className="fas fa-check"></i> Activate
                </button>
              )}
            </td>
          </tr>
        ))}

        {/* ✅ Pagination inside a table row to avoid invalid DOM nesting */}
        <tr>
          <td colSpan="6" style={{ border: 'none', background: 'transparent' }}>
            <Pagination className="justify-content-end mb-0">
              {[...Array(Math.ceil(filteredAccountants.length / itemsPerPage)).keys()].map(
                (pageNumber) => (
                  <Pagination.Item
                    key={pageNumber + 1}
                    active={pageNumber + 1 === currentPage}
                    onClick={() => setCurrentPage(pageNumber + 1)}
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
                      <h5 className="mb-0">All Accountants Data</h5>
                      <div className="d-flex align-items-center">
                        <Form inline className="mr-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by Name or Email..."
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
                          <th>Email</th>
                          <th>Date of Birth</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
                        {generateAccountantData()}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            </section>
          </div>
        )}

        {/* Modal is kept in case you re-enable "View" button later */}
        {accountantData && (
          <div
            className={`modal fade ${isModalOpen ? 'show d-block' : ''}`}
            style={{ backgroundColor: isModalOpen ? 'rgba(0,0,0,0.5)' : 'transparent' }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Accountant Details</h5>
                  <button type="button" className="close" onClick={handleCancel}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Row>
                    <Col style={{ textAlign: 'center' }} md={12}>
                      <img
                        src={accountantData.photo}
                        alt="Accountant"
                        style={{ maxWidth: '100%' }}
                      />
                    </Col>
                    <Col md={6}>
                      <strong>National ID:</strong> {accountantData.nationalID}
                    </Col>
                    <Col md={6}>
                      <strong>Email:</strong> {accountantData.email}
                    </Col>
                    <Col md={6}>
                      <strong>First Name:</strong> {accountantData.firstName}
                    </Col>
                    <Col md={6}>
                      <strong>Last Name:</strong> {accountantData.lastName}
                    </Col>
                    <Col md={6}>
                      <strong>Gender:</strong> {accountantData.gender}
                    </Col>
                    <Col md={6}>
                      <strong>DOB:</strong>{' '}
                      {accountantData.dob &&
                        new Date(accountantData.dob).toLocaleDateString()}
                    </Col>
                    <Col md={6}>
                      <strong>Religion:</strong> {accountantData.religion}
                    </Col>
                    <Col md={6}>
                      <strong>Phone:</strong> {accountantData.phone}
                    </Col>
                  </Row>
                </div>
                <div className="modal-footer">
                  <Button variant="secondary" onClick={handleCancel}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAccountants;