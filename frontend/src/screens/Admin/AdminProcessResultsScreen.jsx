import React, { useState } from 'react';
import { Table, Button, Card, Row, Col, Form, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminProcessResultsScreen = () => {
    const dispatch = useDispatch();
    const [academicYear, setAcademicYear] = useState('2024/2025');
    const [semester, setSemester] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    // Mock pending results (Marks entered but not processed)
    const pendingResults = [
        { _id: 'r1', student: { name: 'John Doe', admissionNumber: 'CS/001/2023' }, unit: 'CS101', marks: 78 },
        { _id: 'r2', student: { name: 'Jane Smith', admissionNumber: 'CS/002/2023' }, unit: 'CS101', marks: 65 },
        { _id: 'r3', student: { name: 'John Doe', admissionNumber: 'CS/001/2023' }, unit: 'CS102', marks: 35 }, // Failing grade
    ];

    const processHandler = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call to: POST /api/academics/process-results
        setTimeout(() => {
            setIsProcessing(false);
            setMessage('Results processed successfully! GPAs have been updated.');
        }, 1500);
    };

    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <Topbar />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid pt-3">
                            <Card className="mb-4">
                                <Card.Header>
                                    <h5 className="mb-0">Process Exam Results</h5>
                                </Card.Header>
                                <Card.Body>
                                    {message && <Alert variant="success">{message}</Alert>}
                                    <Form onSubmit={processHandler}>
                                        <Row className="align-items-end">
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
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Button type="submit" variant="warning" className="w-100" disabled={isProcessing}>
                                                    {isProcessing ? 'Processing...' : 'Process All Results'}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Header>
                                    <h5 className="mb-0">Pending Results (Marks Entered)</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Admission No</th>
                                                <th>Student Name</th>
                                                <th>Course Unit</th>
                                                <th>Raw Marks</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingResults.map((result) => (
                                                <tr key={result._id}>
                                                    <td>{result.student.admissionNumber}</td>
                                                    <td>{result.student.name}</td>
                                                    <td>{result.unit}</td>
                                                    <td>{result.marks}</td>
                                                    <td><span className="badge bg-secondary">Pending</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <p className="text-muted mt-2">
                                        * Processing will calculate the Grade, Grade Points, Semester GPA, and update the student's Academic Record.
                                    </p>
                                </Card.Body>
                            </Card>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminProcessResultsScreen;