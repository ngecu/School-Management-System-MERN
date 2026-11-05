import React, { useState, useEffect } from 'react';
import { Table, Card, Row, Col, Badge, Alert, Button, Form, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';   // ✅ FIX: standalone import
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminDepartmentReportScreen = () => {
    const dispatch = useDispatch();

    // --- Local State ---
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState('');
    const [schoolStats, setSchoolStats] = useState(null);
    const [departmentData, setDepartmentData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSchools, setLoadingSchools] = useState(false);
    const [error, setError] = useState(null);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const base_url = 'http://localhost:5000/api';

    // --- Fetch All Schools on Mount ---
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                setLoadingSchools(true);
                setError(null);
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`${base_url}/schools`, config);
                const schoolList = data.data || data;
                setSchools(schoolList);
                if (schoolList.length > 0) setSelectedSchool(schoolList[0]._id);
                setLoadingSchools(false);
            } catch (err) {
                setLoadingSchools(false);
                setError(err.response?.data?.message || err.message);
            }
        };
        if (userInfo) fetchSchools();
    }, [userInfo]);

    // --- Fetch Report When School Changes ---
    useEffect(() => {
        const fetchDepartmentReport = async () => {
            if (!selectedSchool) return;
            try {
                setLoading(true);
                setError(null);
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(
                    `${base_url}/reports/departments?schoolId=${selectedSchool}`,
                    config
                );
                const payload = data.data || data;
                setSchoolStats(payload.schoolStats);
                setDepartmentData(payload.departments || []);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.response?.data?.message || err.message);
            }
        };
        if (userInfo && selectedSchool) fetchDepartmentReport();
    }, [userInfo, selectedSchool]);

    // --- Refresh Handler ---
    const refreshHandler = async () => {
        if (!selectedSchool) return;
        try {
            setLoading(true);
            setError(null);
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(
                `${base_url}/reports/departments?schoolId=${selectedSchool}`,
                config
            );
            const payload = data.data || data;
            setSchoolStats(payload.schoolStats);
            setDepartmentData(payload.departments || []);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    const currentSchoolName = schools.find(s => s._id === selectedSchool)?.name || '';

    // ============================================
    // 📥 DOWNLOAD HANDLERS
    // ============================================

    // --- Download Overall School Stats as CSV ---
    const downloadStatsCSV = () => {
        if (!schoolStats) return;

        const headers = ['Metric', 'Value'];
        const rows = [
            ['School Name', currentSchoolName],
            ['Total Departments', schoolStats.totalDepartments],
            ['Total Students', schoolStats.totalStudents],
            ['Total Programs', schoolStats.totalPrograms],
            ['Report Generated On', new Date().toLocaleString()],
        ];

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `School_Stats_${currentSchoolName.replace(/\s+/g, '_')}_${Date.now()}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    // --- Download Overall School Stats as PDF ---
    const downloadStatsPDF = () => {
        if (!schoolStats) return;

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`${currentSchoolName} - Overall Statistics`, 14, 20);

        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

        // ✅ FIX: standalone autoTable(doc, options)
        autoTable(doc, {
            startY: 35,
            head: [['Metric', 'Value']],
            body: [
                ['Total Departments', schoolStats.totalDepartments],
                ['Total Students', schoolStats.totalStudents],
                ['Total Programs', schoolStats.totalPrograms],
            ],
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
        });

        doc.save(`School_Stats_${currentSchoolName.replace(/\s+/g, '_')}.pdf`);
    };

    // --- Download Department Breakdown as CSV ---
    const downloadDepartmentsCSV = () => {
        if (departmentData.length === 0) return;

        const headers = ['Department', 'Total Students', 'Programs Offered', 'Lecturers', 'Average Performance'];
        const rows = departmentData.map(dept => [
            dept.department,
            dept.totalStudents,
            dept.totalPrograms,
            dept.totalLecturers,
            dept.averagePerformance
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Department_Breakdown_${currentSchoolName.replace(/\s+/g, '_')}_${Date.now()}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    // --- Download Department Breakdown as PDF ---
    const downloadDepartmentsPDF = () => {
        if (departmentData.length === 0) return;

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`${currentSchoolName} - Department Breakdown`, 14, 20);

        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

        // ✅ FIX: standalone autoTable(doc, options)
        autoTable(doc, {
            startY: 35,
            head: [['Department', 'Total Students', 'Programs', 'Lecturers', 'Avg Performance']],
            body: departmentData.map(dept => [
                dept.department,
                dept.totalStudents,
                dept.totalPrograms,
                dept.totalLecturers,
                dept.averagePerformance
            ]),
            theme: 'striped',
            headStyles: { fillColor: [39, 174, 96] },
        });

        doc.save(`Department_Breakdown_${currentSchoolName.replace(/\s+/g, '_')}.pdf`);
    };

    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <Topbar />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid pt-3">

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4>
                                    {currentSchoolName
                                        ? `${currentSchoolName} - Department Reports`
                                        : 'Department Reports'}
                                </h4>
                                <Button
                                    variant="outline-primary"
                                    onClick={refreshHandler}
                                    disabled={!selectedSchool || loading}
                                >
                                    <i className="fas fa-sync-alt"></i> Refresh
                                </Button>
                            </div>

                            {/* --- School Selector --- */}
                            <Card className="mb-4">
                                <Card.Body>
                                    <Row className="align-items-end">
                                        <Col md={8}>
                                            <Form.Group controlId="schoolSelect">
                                                <Form.Label>Select School</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={selectedSchool}
                                                    onChange={(e) => setSelectedSchool(e.target.value)}
                                                    disabled={loadingSchools}
                                                >
                                                    <option value="">-- Select a School --</option>
                                                    {schools.map((school) => (
                                                        <option key={school._id} value={school._id}>
                                                            {school.name}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {error && <Alert variant="danger">{error}</Alert>}

                            {!selectedSchool && !loadingSchools && (
                                <Message variant="info">
                                    Please select a school from the dropdown above to view the report.
                                </Message>
                            )}

                            {loading ? (
                                <Loader />
                            ) : (
                                selectedSchool && (
                                    <>
                                        {/* ===== Overall School Stats ===== */}
                                        <Row className="mb-4">
                                            <Col md={12}>
                                                <Card>
                                                    <Card.Header className="d-flex justify-content-between align-items-center">
                                                        <span>Overall School Stats</span>
                                                        {schoolStats && (
                                                            <ButtonGroup size="sm">
                                                                <Button variant="success" onClick={downloadStatsCSV}>
                                                                    <i className="fas fa-file-csv"></i> CSV
                                                                </Button>
                                                                <Button variant="danger" onClick={downloadStatsPDF}>
                                                                    <i className="fas fa-file-pdf"></i> PDF
                                                                </Button>
                                                            </ButtonGroup>
                                                        )}
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {schoolStats ? (
                                                            <Row>
                                                                <Col md={4}>
                                                                    <p><strong>Total Departments:</strong> {schoolStats.totalDepartments}</p>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <p><strong>Total Students:</strong> {schoolStats.totalStudents}</p>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <p><strong>Total Programs:</strong> {schoolStats.totalPrograms}</p>
                                                                </Col>
                                                            </Row>
                                                        ) : (
                                                            <p>No overall stats available.</p>
                                                        )}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>

                                        {/* ===== Department Breakdown ===== */}
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between align-items-center">
                                                <span>Breakdown Per Department</span>
                                                {departmentData.length > 0 && (
                                                    <ButtonGroup size="sm">
                                                        <Button variant="success" onClick={downloadDepartmentsCSV}>
                                                            <i className="fas fa-file-csv"></i> CSV
                                                        </Button>
                                                        <Button variant="danger" onClick={downloadDepartmentsPDF}>
                                                            <i className="fas fa-file-pdf"></i> PDF
                                                        </Button>
                                                    </ButtonGroup>
                                                )}
                                            </Card.Header>
                                            <Card.Body>
                                                {departmentData.length === 0 ? (
                                                    <Message variant="info">No department data found for this school.</Message>
                                                ) : (
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
                                                                <tr key={dept._id || index}>
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
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </>
                                )
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminDepartmentReportScreen;