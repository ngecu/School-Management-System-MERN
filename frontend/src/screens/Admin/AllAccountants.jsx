import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Card, Pagination, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
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
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = accountantDelete;


  const userTogleActive = useSelector((state)=> state.userTogleActive)


const {
  success:successToggle
} = userTogleActive


  useEffect(() => {
    dispatch(listAccountants());
  }, [dispatch,successToggle,successDelete]);


  const handleToggleSuccess = () => {
    // Reset the success flag after handling the success action
    dispatch({ type: 'USER_TOGGLE_SUCCESS_RESET' });
  };


  const showModal = (data) => {
    console.log("show modal ",data);
    setAccountantData(data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteHandler = (accountId) => {
    if (window.confirm('Are you sure you want to delete this accountant?')) {
      dispatch(deleteAccountant(accountId));
    }
  };

  const toggleStatus = (userId) => {
    console.log(userId);
    dispatch(toggleUserActive(userId));
  };

  const generateAccountantData = () => {
    const filteredAccountants = accountants.filter(
      (accountant) =>
        accountant.accountant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accountant.accountant.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accountant.accountant.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredAccountants.length === 0) {
      return (
        <tr>
          <td colSpan="8">
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
            <td>{accountant.accountant.firstName} {accountant.lastName}</td>
            <td>{accountant.accountant.gender}</td>
           
            <td>{accountant.accountant.email}</td>
            <td>{accountant.accountant.dob && new Date(accountant.accountant.dob).toLocaleDateString()}</td>
            <td>
              {accountant.user.isActive ? (
                <span className="badge badge-success">Active</span>
              ) : (
                <span className="badge badge-danger">Inactive</span>
              )}
            </td>
            <td>
              {/* <button className="btn btn-success btn-sm" onClick={() => showModal(accountant.accountant)}>
                <i className="fas fa-folder"></i> View
              </button> */}
              <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(accountant.accountant._id)}>
                <i className="fas fa-trash"></i> Delete
              </button>
              {accountant.user?.isActive ? (
                <button className="btn btn-warning btn-sm" onClick={() => toggleStatus(accountant.user._id)}>
                  <i className="fas fa-times"></i> Deactivate
                </button>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={() => toggleStatus(accountant.user._id)}>
                  <i className="fas fa-check"></i> Activate
                </button>
              )}
            </td>
          </tr>
        ))}
        <Pagination>
          {[...Array(Math.ceil(filteredAccountants.length / itemsPerPage)).keys()].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === currentPage}
              onClick={() => setCurrentPage(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
        </Pagination>
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
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>All Accountants Data</h5>
                      <Form inline>
                        <Form.Control
                          type="text"
                          placeholder="Search by Name..."
                          className="mr-2"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </Form>
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
        <Modal
          title={`Accountant Details (${accountantData?.admissionNumber})`}
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {accountantData && (
            <Row>
              <Col style={{ textAlign: 'center' }} md={12}>
                <img src={accountantData.photo} alt="Accountant" style={{ maxWidth: '100%' }} />
              </Col>
              <Col md={6}>
                <strong>National ID:</strong> {accountantData.nationalID}
              </Col>
              <Col md={6}>
                <strong>Year of Study:</strong> {accountantData.yearOfStudy}
              </Col>
              <Col md={6}>
                <strong>Course:</strong> {accountantData.course}
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
                <strong>DOB:</strong> {accountantData.dob && new Date(accountantData.dob).toLocaleDateString()}
              </Col>
              <Col md={6}>
                <strong>Religion:</strong> {accountantData.religion}
              </Col>
              <Col md={6}>
                <strong>Phone:</strong> {accountantData.phone}
              </Col>
            </Row>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AllAccountants;
