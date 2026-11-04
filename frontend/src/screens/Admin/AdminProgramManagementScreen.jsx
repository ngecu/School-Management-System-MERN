import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Form, Card, Modal, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listDepartments } from '../../actions/departmentActions';   // ← NEW
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import { createProgram, listPrograms } from '../../actions/programActions';
import { PROGRAM_CREATE_RESET } from '../../constants/programConstants';

const AdminProgramManagementScreen = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('Degree');
  const [maxCapacity, setMaxCapacity] = useState(100);
  const [durationInSemesters, setDurationInSemesters] = useState(8);
  const [maxUnitsPerSemester, setMaxUnitsPerSemester] = useState(6);

const programList = useSelector((state) => state.programList);
const { loading, error, programs } = programList;

// ↓ NEW
const departmentList = useSelector((state) => state.departmentList);
const { departments, error: departmentError } = departmentList;

  const programCreate = useSelector((state) => state.programCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = programCreate;

useEffect(() => {
  dispatch(listDepartments());          // ← load departments once
}, [dispatch]);

useEffect(() => {
  if (successCreate) {
    setShowModal(false);
    dispatch({ type: PROGRAM_CREATE_RESET });
    dispatch(listPrograms());
  }
  dispatch(listPrograms());
}, [dispatch, successCreate]);

  const resetForm = () => {
    setName('');
    setCode('');
    setDepartment('');
    setLevel('Degree');
    setMaxCapacity(100);
    setDurationInSemesters(8);
    setMaxUnitsPerSemester(6);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProgram({
        name,
        code: code.trim().toUpperCase(),
        department,
        level,
        maxCapacity: Number(maxCapacity),
        durationInSemesters: Number(durationInSemesters),
        maxUnitsPerSemester: Number(maxUnitsPerSemester),
      })
    );
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
                  <h4>Program Management</h4>
                </Col>
                <Col className="text-end">
                  <Button
                    variant="primary"
                    onClick={() => { resetForm(); setShowModal(true); }}
                  >
                    + Create New Program
                  </Button>
                </Col>
              </Row>

{errorCreate && <Alert variant="danger">{errorCreate}</Alert>}
{error && <Alert variant="danger">{error}</Alert>}
{departmentError && <Alert variant="warning">{departmentError}</Alert>}   {/* ← NEW */}
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
                          <th>Program Name</th>
                          <th>Code</th>
                          <th>Department</th>
                          <th>Level</th>
                          <th>Capacity Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {programs && programs.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No programs yet. Create one.
                            </td>
                          </tr>
                        )}
                        {programs && programs.map((program) => {
                          const enrolled = program.currentEnrollment || 0;
                          const cap = program.maxCapacity || 0;
                          const isFull = enrolled >= cap;
                          return (
                            <tr key={program._id}>
                              <td>{program.name}</td>
                              <td>{program.code}</td>
                              {/* If using ObjectId ref: */}
                              <td>
                                {program.department?.name || program.department}
                              </td>
                              <td>{program.level}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className={isFull ? 'text-danger' : 'text-success'}>
                                    {enrolled} / {cap}
                                  </span>
                                  <div className="progress ms-2 w-50" style={{ height: '10px' }}>
                                    <div
                                      className={`progress-bar ${isFull ? 'bg-danger' : 'bg-success'}`}
                                      style={{ width: `${cap ? (enrolled / cap) * 100 : 0}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}
            </div>
          </section>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Program</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
            {loadingCreate && (
              <div className="text-center mb-3">
                <Spinner size="sm" /> Creating…
              </div>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Program Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Program Code</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department (e.g., CS, CIS, DBIT)</Form.Label>
              <Form.Control
  as="select"
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
  required
>
  <option value="">— Select department —</option>
  {departments && departments.map((d) => (
    <option key={d._id} value={d._id}>{d.name} ({d.code})</option>
  ))}
</Form.Control>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Level</Form.Label>
                  <Form.Control
                    as="select"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option>Certificate</option>
                    <option>Diploma</option>
                    <option>Degree</option>
                    <option>Masters</option>
                    <option>PhD</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (semesters)</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={durationInSemesters}
                    onChange={(e) => setDurationInSemesters(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Max Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Max Units / Semester</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={maxUnitsPerSemester}
                    onChange={(e) => setMaxUnitsPerSemester(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loadingCreate}>
              Create Program
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProgramManagementScreen;