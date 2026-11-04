import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Form, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const StudentRegistrationScreen = () => {
    const dispatch = useDispatch();
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [academicYear, setAcademicYear] = useState('2024/2025');
    const [semester, setSemester] = useState(1);

    // Mock data - Replace with Redux selectors for courseUnits and registration state
    const courseUnits = [
        { _id: '1', code: 'CS101', name: 'Introduction to Programming', credits: 3 },
        { _id: '2', code: 'CS102', name: 'Discrete Mathematics', credits: 3 },
        { _id: '3', code: 'CIS201', name: 'Database Systems', credits: 4 },
        { _id: '4', code: 'DBIT301', name: 'Web Development', credits: 3 },
        { _id: '5', code: 'CS301', name: 'Operating Systems', credits: 3 },
        { _id: '6', code: 'CS302', name: 'Computer Networks', credits: 3 },
        { _id: '7', code: 'CIS302', name: 'System Analysis', credits: 3 },
    ];

    const maxUnits = 6; // From notes: "Reg 6 units per term"

    const handleSelectUnit = (unitId) => {
        if (selectedUnits.includes(unitId)) {
            setSelectedUnits(selectedUnits.filter(id => id !== unitId));
        } else {
            if (selectedUnits.length >= maxUnits) {
                alert(`You cannot register for more than ${maxUnits} units per term.`);
                return;
            }
            setSelectedUnits([...selectedUnits, unitId]);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch action: registerUnits({ unitIds: selectedUnits, academicYear, semester })
        console.log('Registering Units:', selectedUnits);
    };

    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <Topbar />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid pt-3">
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <Card.Header>
                                            <h5 className="mb-0">Unit Registration - Semester {semester}, {academicYear}</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Alert variant="info">
                                                <strong>Note:</strong> You can only register for a maximum of {maxUnits} units per term.
                                                Currently selected: <strong>{selectedUnits.length} / {maxUnits}</strong>
                                            </Alert>
                                            <Form onSubmit={submitHandler}>
                                                <Row className="mb-3">
                                                    <Col md={4}>
                                                        <Form.Group controlId="academicYear">
                                                            <Form.Label>Academic Year</Form.Label>
                                                            <Form.Control as="select" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}>
                                                                <option value="2023/2024">2023/2024</option>
                                                                <option value="2024/2025">2024/2025</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group controlId="semester">
                                                            <Form.Label>Semester</Form.Label>
                                                            <Form.Control as="select" value={semester} onChange={(e) => setSemester(Number(e.target.value))}>
                                                                <option value={1}>Semester 1</option>
                                                                <option value={2}>Semester 2</option>
                                                                <option value={3}>Semester 3 (Trimester)</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Table striped bordered hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>Select</th>
                                                            <th>Unit Code</th>
                                                            <th>Unit Name</th>
                                                            <th>Credits</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {courseUnits.map((unit) => (
                                                            <tr key={unit._id}>
                                                                <td>
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        checked={selectedUnits.includes(unit._id)}
                                                                        onChange={() => handleSelectUnit(unit._id)}
                                                                    />
                                                                </td>
                                                                <td>{unit.code}</td>
                                                                <td>{unit.name}</td>
                                                                <td>{unit.credits}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>

                                                <Button type="submit" variant="primary" disabled={selectedUnits.length === 0}>
                                                    Register Units
                                                </Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Add/Drop Section */}
                            <Row className="mt-4">
                                <Col md={12}>
                                    <Card>
                                        <Card.Header>
                                            <h5 className="mb-0">Add / Drop Units (Currently Registered)</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Unit Code</th>
                                                        <th>Unit Name</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Mock Registered Units */}
                                                    <tr>
                                                        <td>CS101</td>
                                                        <td>Introduction to Programming</td>
                                                        <td><span className="badge bg-success">Active</span></td>
                                                        <td><Button variant="danger" size="sm">Drop</Button></td>
                                                    </tr>
                                                    <tr>
                                                        <td>CS102</td>
                                                        <td>Discrete Mathematics</td>
                                                        <td><span className="badge bg-secondary">Dropped</span></td>
                                                        <td><Button variant="success" size="sm">Add Back</Button></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default StudentRegistrationScreen;