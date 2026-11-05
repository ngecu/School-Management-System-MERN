import React, { useState, useEffect } from 'react';
import {
  Table, Button, Row, Col, Form, Card, Modal, Spinner, Alert, Badge,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { listSchools } from '../../actions/schoolActions';   // ← NEW

import {
  listDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../../actions/departmentActions';
import {
  DEPARTMENT_CREATE_RESET,
  DEPARTMENT_UPDATE_RESET,
} from '../../constants/departmentConstants';
import { exportToPdf } from '../../utils/exportToPdf';

const AdminDepartmentManagementScreen = () => {
  const dispatch = useDispatch();

  // form / modal state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = create, else update
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
const [school, setSchool] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // selectors
  const departmentList = useSelector((s) => s.departmentList);
  const { loading, error, departments } = departmentList;

  const departmentCreate = useSelector((s) => s.departmentCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = departmentCreate;

  const departmentUpdate = useSelector((s) => s.departmentUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = departmentUpdate;

  const departmentDelete = useSelector((s) => s.departmentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = departmentDelete;


  const schoolList = useSelector((s) => s.schoolList);
const { schools, error: schoolError } = schoolList;

  useEffect(() => {
    dispatch(listDepartments());
  }, [dispatch, successCreate, successUpdate, successDelete]);

  useEffect(() => {
  dispatch(listSchools());
}, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      setShowModal(false);
      dispatch({ type: DEPARTMENT_CREATE_RESET });
    }
    if (successUpdate) {
      setShowModal(false);
      dispatch({ type: DEPARTMENT_UPDATE_RESET });
    }
  }, [successCreate, successUpdate, dispatch]);

  const resetForm = () => {
  setEditingId(null);
  setName('');
  setCode('');
  setDescription('');
  setSchool('');       // ← NEW
};

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (dept) => {
  setEditingId(dept._id);
  setName(dept.name || '');
  setCode(dept.code || '');
  setDescription(dept.description || '');
  setSchool(dept.school?._id || dept.school || '');   // ← NEW
  setShowModal(true);
};

  const openDelete = (dept) => {
    setDeleteTarget(dept);
    setShowDelete(true);
  };

  const submitHandler = (e) => {
  e.preventDefault();
  const payload = {
    name: name.trim(),
    code: code.trim().toUpperCase(),
    description: description.trim(),
    school,                                        // ← NEW
  };
  if (editingId) {
    dispatch(updateDepartment(editingId, payload));
  } else {
    dispatch(createDepartment(payload));
  }
};

  const confirmDelete = () => {
    if (deleteTarget) {
      dispatch(deleteDepartment(deleteTarget._id));
      setShowDelete(false);
      setDeleteTarget(null);
    }
  };


  const downloadPdfHandler = () => {
  exportToPdf({
    title: 'Department List',
    filename: 'departments',
    columns: ['Name', 'Code', 'School', 'Description'],
    rows: departments.map((d) => [
      d.name || '',
      d.code || '',
      d.school?.name || '—',
      d.description || '—',
    ]),
  });
};

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Topbar />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid pt-3">
              <Row className="mb-3">
                <Col>
                  <h4>Department Management</h4>
                </Col>
                <Col className="text-end">
                    <Button
                        variant="outline-secondary"
                        className="me-2"
                        onClick={downloadPdfHandler}
                        disabled={!departments || departments.length === 0}
                    >
                        <i className="fas fa-file-pdf me-1"></i>
                        Download PDF
                    </Button>
                    <Button variant="primary" onClick={openCreate}>
                        + New Department
                    </Button>
                    </Col>
              </Row>

              {(error || errorCreate || errorUpdate || errorDelete) && (
                <Alert variant="danger">
                  {error || errorCreate || errorUpdate || errorDelete}
                </Alert>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Card>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Code</th>
                          <th>Description</th>
                          <th style={{ width: 180 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departments.length === 0 && (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No departments yet. Create one.
                            </td>
                          </tr>
                        )}
                        {departments.map((d) => (
                          <tr key={d._id}>
                            <td>{d.name}</td>
                            <td><Badge bg="info">{d.code}</Badge></td>
                            <td>{d.description || <em className="text-muted">—</em>}</td>
                            <td>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                className="me-2"
                                onClick={() => openEdit(d)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => openDelete(d)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? 'Edit Department' : 'New Department'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
            {(loadingCreate || loadingUpdate) && (
              <div className="text-center mb-3">
                <Spinner size="sm" /> Saving…
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Business Information Technology"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department Code</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. DBIT"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
  <Form.Label>School</Form.Label>
  <Form.Control
    as="select"
    value={school}
    onChange={(e) => setSchool(e.target.value)}
    required
  >
    <option value="">— Select school —</option>
    {schools && schools.map((s) => (
      <option key={s._id} value={s._id}>
        {s.name} ({s.code})
      </option>
    ))}
  </Form.Control>
  {schools && schools.length === 0 && (
    <Form.Text className="text-warning">
      No schools found. Create one in the database first (or via POST /api/schools).
    </Form.Text>
  )}
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loadingCreate || loadingUpdate}
            >
              {editingId ? 'Save Changes' : 'Create Department'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteTarget && (
            <>
              <p>
                Delete <strong>{deleteTarget.name}</strong> ({deleteTarget.code})?
              </p>
              <p className="text-muted small mb-0">
                This cannot be undone. If any programs reference this department,
                the delete will be blocked.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            disabled={loadingDelete}
          >
            {loadingDelete ? 'Deleting…' : 'Yes, Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDepartmentManagementScreen;