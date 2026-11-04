import React from 'react';
import { Table, Card, Row, Col, Badge } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminDepartmentReportScreen = () => {
    // Mock data for Department Report
    const departmentData = [
        {
            department: 'Computer Science (CS)',
            totalStudents: 450,
            totalPrograms: 3,
            totalLecturers: 15,
            averagePerformance: 'B+'
        },
        {
            department: 'Computer Information Systems (CIS)',
            totalStudents: 320,
            totalPrograms: 2,
            totalLecturers: 10,
            averagePerformance: 'B'
        },
        {
            department: 'Business Information Technology (DBIT)',
            totalStudents: 280,
            totalPrograms: 2,
            totalLecturers: 8,
            averagePerformance: 'B'
        }
    ];

    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <Topbar />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid pt-3">
                            <h4 className="mb-4">School of Computing & Informatics - Department Reports</h4>
                            
                            <Row className="mb-4">
                                <Col md={6}>
                                    <Card>
                                        <Card.Header>Overall School Stats</Card.Header>
                                        <Card.Body>
                                            <p><strong>Total Departments:</strong> 5 (BBSI, CIS, DBIT, DCIS, CS)</p>
                                            <p><strong>Total Students:</strong> 1,050</p>
                                            <p><strong>Total Programs:</strong> 10</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Card>
                                <Card.Header>
                                    <h5 className="mb-0">Breakdown Per Department</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Department</th>
                                                <th>Total Students</th>
                                                <th>Programs Offered</th>
                                                <th>Lecturers</th>
                                                <th>Average Performance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {departmentData.map((dept, index) => (
                                                <tr key={index}>
                                                    <td>{dept.department}</td>
                                                    <td>{dept.totalStudents}</td>
                                                    <td>{dept.totalPrograms}</td>
                                                    <td>{dept.totalLecturers}</td>
                                                    <td>
                                                        <Badge bg="success">{dept.averagePerformance}</Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminDepartmentReportScreen;