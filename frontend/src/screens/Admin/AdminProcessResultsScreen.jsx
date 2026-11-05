import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Ensure you have axios installed: npm i axios
import Loader from '../../components/Loader'; // Adjust path as needed
import Message from '../../components/Message'; // Adjust path as needed
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminProcessResultsScreen = () => {
    const dispatch = useDispatch();

    // --- Local Form State ---
    const [academicYear, setAcademicYear] = useState('2024/2025');
    const [semester, setSemester] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // --- Backend Data State ---
    const [pendingResults, setPendingResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- Get User Info for Auth Token ---
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const base_url = 'http://localhost:5000/api/academics';


    // --- Fetch Pending Results from Backend ---
    useEffect(() => {
        const fetchPendingResults = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                // Replace with your actual backend route for pending results
                // e.g., GET /api/exams/pending-results?year=2024/2025&semester=1
                const { data } = await axios.get(
                    `${base_url}/pending-results?academicYear=${academicYear}&semester=${semester}`,
                    config
                );

                setPendingResults(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(
                    err.response && err.response.data.message
                        ? err.response.data.message
                        : err.message
                );
            }
        };

        if (userInfo) {
            fetchPendingResults();
        }
    }, [userInfo, academicYear, semester]);

    // --- Process Results Handler ---
    const processHandler = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setMessage(null);
        setError(null);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // Connect to the backend controller we built earlier
            // POST /api/academics/process-results
            const { data } = await axios.post(
                '/api/academics/process-results',
                { academicYear, semester },
                config
            );

            setIsProcessing(false);
            setMessage(data.message || 'Results processed successfully! GPAs have been updated.');
            
            // Refresh the pending list after processing
            setPendingResults([]); // Or re-fetch the data

        } catch (err) {
            setIsProcessing(false);
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    };

    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <Topbar />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid pt-3">
                            
                            {/* Alerts for Success/Error */}
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Card className="mb-4">
                                <Card.Header>
                                    <h5 className="mb-0">Process Exam Results</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={processHandler}>
                                        <Row className="align-items-end">
                                            <Col md={4}>
                                                <Form.Group controlId="academicYear">
                                                    <Form.Label>Academic Year</Form.Label>
                                                    <Form.Control 
                                                        as="select" 
                                                        value={academicYear} 
                                                        onChange={(e) => setAcademicYear(e.target.value)}
                                                    >
                                                        <option value="2023/2024">2023/2024</option>
                                                        <option value="2024/2025">2024/2025</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group controlId="semester">
                                                    <Form.Label>Semester</Form.Label>
                                                    <Form.Control 
                                                        as="select" 
                                                        value={semester} 
                                                        onChange={(e) => setSemester(Number(e.target.value))}
                                                    >
                                                        <option value={1}>Semester 1</option>
                                                        <option value={2}>Semester 2</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Button 
                                                    type="submit" 
                                                    variant="warning" 
                                                    className="w-100" 
                                                    disabled={isProcessing || pendingResults.length === 0}
                                                >
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
                                    {loading ? (
                                        <Loader />
                                    ) : pendingResults.length === 0 ? (
                                        <Message variant="info">No pending results found for this semester.</Message>
                                    ) : (
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
                                                        {/* Adjust these to match your exact API response structure */}
                                                        <td>{result.student?.admissionNumber}</td>
                                                        <td>{result.student?.name}</td>
                                                        <td>{result.courseUnit?.name || result.courseUnit}</td>
                                                        <td>{result.marks}</td>
                                                        <td><span className="badge bg-secondary">Pending</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
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