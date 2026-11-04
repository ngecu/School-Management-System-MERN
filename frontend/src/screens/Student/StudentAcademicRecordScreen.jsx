import React, { useEffect } from 'react';
import { Table, Card, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const StudentAcademicRecordScreen = () => {
    const dispatch = useDispatch();

    // Mock data - Replace with Redux: state.academicRecordDetails
    const academicRecord = {
        studentDetails: { name: 'John Doe', admissionNumber: 'CS/001/2023' },
        program: { name: 'BSc Computer Science', code: 'BSC-CS' },
        cumulativeGPA: 3.45,
        standing: 'Good Standing',
        semesterHistory: [
            { academicYear: '2023/2024', semester: 1, gpa: 3.2, creditsRegistered: 18, creditsEarned: 18, status: 'Pass' },
            { academicYear: '2023/2024', semester: 2, gpa: 3.5, creditsRegistered: 18, creditsEarned: 15, status: 'Pass' },
        ],
        retakesPending: [{ name: 'Data Structures', code: 'CS201' }]
    };

    const loading = false; // Replace with Redux loading state

    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <Topbar />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid pt-3">
                            {loading ? <Loader /> : (
                                <>
                                    <Row className="mb-4">
                                        <Col md={8}>
                                            <Card>
                                                <Card.Header>
                                                    <h5 className="mb-0">Academic Record (Rigor Per Student)</h5>
                                                </Card.Header>
                                                <Card.Body>
                                                    <p><strong>Name:</strong> {academicRecord.studentDetails.name}</p>
                                                    <p><strong>Admission No:</strong> {academicRecord.studentDetails.admissionNumber}</p>
                                                    <p><strong>Program:</strong> {academicRecord.program.name} ({academicRecord.program.code})</p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card className="text-center h-100">
                                                <Card.Body className="d-flex flex-column justify-content-center">
                                                    <h6 className="text-muted">Cumulative GPA</h6>
                                                    <h2 className="text-primary">{academicRecord.cumulativeGPA.toFixed(2)}</h2>
                                                    <Badge bg={academicRecord.standing === 'Good Standing' ? 'success' : 'danger'}>
                                                        {academicRecord.standing}
                                                    </Badge>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Card>
                                        <Card.Header>
                                            <h5 className="mb-0">Semester History</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Academic Year</th>
                                                        <th>Semester</th>
                                                        <th>GPA</th>
                                                        <th>Credits Registered</th>
                                                        <th>Credits Earned</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {academicRecord.semesterHistory.map((record, index) => (
                                                        <tr key={index}>
                                                            <td>{record.academicYear}</td>
                                                            <td>{record.semester}</td>
                                                            <td>{record.gpa.toFixed(2)}</td>
                                                            <td>{record.creditsRegistered}</td>
                                                            <td>{record.creditsEarned}</td>
                                                            <td>
                                                                <Badge bg={record.status === 'Pass' ? 'success' : 'danger'}>
                                                                    {record.status}
                                                                </Badge>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>

                                            {academicRecord.retakesPending.length > 0 && (
                                                <div className="mt-4">
                                                    <h6 className="text-danger">Pending Retakes</h6>
                                                    <ul>
                                                        {academicRecord.retakesPending.map((unit, i) => (
                                                            <li key={i}>{unit.code} - {unit.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default StudentAcademicRecordScreen;