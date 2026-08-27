import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container, Card, Badge, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { listStudents } from '../../actions/studentActions';
import { listLecturers } from '../../actions/lecturerActions';
import { listCourses } from '../../actions/courseActions';
import { listAccountants } from '../../actions/accountantActions';
import { Chart as ChartJS, defaults, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { 
  FaUsers, 
  FaChalkboardTeacher, 
  FaBook, 
  FaUserGraduate, 
  FaMoneyBillWave, 
  FaCalendarAlt,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaChartLine,
  FaTrophy,
  FaClock
} from 'react-icons/fa';
import { MdDashboard, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import './AdminDashboard.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const IndexAdminScreen = () => {
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showStats, setShowStats] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listStudents());
    dispatch(listLecturers());
    dispatch(listCourses());
    dispatch(listAccountants());
  }, [dispatch]);

  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;

  const lecturerList = useSelector((state) => state.lecturerList);
  const { lecturers } = lecturerList;

  const accountantLists = useSelector((state) => state.accountantList);
  const { accountants } = accountantLists;

  const coursesList = useSelector((state) => state.courseList);
  const { loading: loadingCourses, courses, error: errorCourses } = coursesList;

  // Calculate statistics
  const totalStudents = students?.length || 0;
  const totalLecturers = lecturers?.length || 0;
  const totalAccountants = accountants?.length || 0;
  const totalCourses = courses?.length || 0;
  const totalUsers = totalStudents + totalLecturers + totalAccountants;

  // Calculate gender distribution
  const maleStudents = students?.filter(s => s.gender === 'male').length || 0;
  const femaleStudents = students?.filter(s => s.gender === 'female').length || 0;
  
  // Calculate year of study distribution
  const year1Students = students?.filter(s => s.year_of_study === '1').length || 0;
  const year2Students = students?.filter(s => s.year_of_study === '2').length || 0;
  const year3Students = students?.filter(s => s.year_of_study === '3').length || 0;
  const year4Students = students?.filter(s => s.year_of_study === '4').length || 0;

  // Chart data
  const userDistributionData = {
    labels: ['Students', 'Lecturers', 'Accountants'],
    datasets: [{
      data: [totalStudents, totalLecturers, totalAccountants],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2,
      hoverOffset: 15
    }]
  };

  const genderDistributionData = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [maleStudents, femaleStudents],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2
    }]
  };

  const yearDistributionData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
    datasets: [{
      label: 'Students by Year',
      data: [year1Students, year2Students, year3Students, year4Students],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    }
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // Stat cards data
  const statCards = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: FaUserGraduate,
      color: '#4e73df',
      bgColor: '#224abe',
      link: '/admin/allStudents',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Total Lecturers',
      value: totalLecturers,
      icon: FaChalkboardTeacher,
      color: '#1cc88a',
      bgColor: '#13855c',
      link: '/admin/allLecturers',
      trend: '+5%',
      trendUp: true
    },
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: FaBook,
      color: '#36b9cc',
      bgColor: '#258391',
      link: '/admin/courses',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: FaUsers,
      color: '#f6c23e',
      bgColor: 'black',
      link: '#',
      trend: '+10%',
      trendUp: true
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New student admitted', user: 'John Doe', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'Fee payment received', user: 'Jane Smith', amount: 'KSH 30,000', time: '1 hour ago', type: 'info' },
    { id: 3, action: 'New course added', user: 'Admin', course: 'Computer Science', time: '3 hours ago', type: 'warning' },
    { id: 4, action: 'Exam results published', user: 'Dr. Kamau', time: '5 hours ago', type: 'primary' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'End of Semester Exams', date: 'Dec 15, 2024', days: '12 days left', icon: FaCalendarAlt },
    { id: 2, title: 'Parent-Teacher Meeting', date: 'Dec 20, 2024', days: '17 days left', icon: FaUsers },
    { id: 3, title: 'Graduation Ceremony', date: 'Jan 10, 2025', days: '38 days left', icon: FaGraduationCap },
  ];

  if (loading || loadingCourses) {
    return (
      <div className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <Topbar />
          <Sidebar />
          <div className="content-wrapper d-flex align-items-center justify-content-center">
            <div className="text-center">
              <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
              <p className="mt-3">Loading dashboard data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <Topbar />
          <Sidebar />
          <div className="content-wrapper">
            <Message variant="danger">{error}</Message>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Topbar />
        <Sidebar />
        <div className="content-wrapper admin-dashboard">
          <div className="container-fluid">
            {/* Welcome Section */}
            <div className="row pt-4 pb-2">
              <div className="col-12">
                <div className="welcome-card">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex align-items-center">
                      {userInfo?.userData?.photo ? (
                        <img 
                          src={userInfo.userData.photo} 
                          alt="Profile" 
                          className="welcome-avatar"
                        />
                      ) : (
                        <FaUserCircle className="welcome-avatar-icon" />
                      )}
                      <div className="ml-3">
                        <h2 className="welcome-title">
                          Welcome back, <span className="text-primary">{userInfo?.userData?.firstName} {userInfo?.userData?.lastName}</span>
                        </h2>
                        <p className="welcome-subtitle">
                          Here's what's happening with your school today
                        </p>
                      </div>
                    </div>
                    <div className="date-badge">
                      <FaCalendarAlt className="mr-2" />
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
              {statCards.map((card, index) => (
                <div className="col-xl-3 col-md-6 mb-4" key={index}>
                  <div 
                    className="stat-card" 
                    style={{ background: card.bgColor }}
                    onClick={() => card.link !== '#' && history.push(card.link)}
                  >
                    <div className="stat-card-content">
                      <div className="stat-card-info">
                        <p className="stat-card-title">{card.title}</p>
                        <h3 className="stat-card-value">{card.value}</h3>
                        <div className="stat-card-trend">
                          {card.trendUp ? <MdTrendingUp /> : <MdTrendingDown />}
                          <span className={card.trendUp ? 'trend-up' : 'trend-down'}>
                            {card.trend}
                          </span>
                        </div>
                      </div>
                      <div className="stat-card-icon">
                        <card.icon />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="row mb-4">
              <div className="col-xl-4 col-md-6 mb-4">
                <div className="dashboard-card">
                  <div className="card-header-custom">
                    <h5 className="card-title">
                      <FaUsers className="mr-2" />
                      User Distribution
                    </h5>
                  </div>
                  <div className="card-body-custom">
                    <div style={{ height: '300px' }}>
                      <Doughnut data={userDistributionData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-6 mb-4">
                <div className="dashboard-card">
                  <div className="card-header-custom">
                    <h5 className="card-title">
                      <FaUserGraduate className="mr-2" />
                      Gender Distribution
                    </h5>
                  </div>
                  <div className="card-body-custom">
                    <div style={{ height: '300px' }}>
                      <Doughnut data={genderDistributionData} options={chartOptions} />
                    </div>
                    <div className="gender-stats mt-3">
                      <div className="d-flex justify-content-between">
                        <span>Male Students: <strong>{maleStudents}</strong></span>
                        <span>Female Students: <strong>{femaleStudents}</strong></span>
                      </div>
                      <div className="progress mt-2">
                        <div 
                          className="progress-bar bg-info" 
                          style={{ width: `${(maleStudents / totalStudents) * 100}%` }}
                        >
                          {Math.round((maleStudents / totalStudents) * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-12 mb-4">
                <div className="dashboard-card">
                  <div className="card-header-custom">
                    <h5 className="card-title">
                      <FaChartLine className="mr-2" />
                      Students by Year
                    </h5>
                  </div>
                  <div className="card-body-custom">
                    <div style={{ height: '300px' }}>
                      <Bar data={yearDistributionData} options={barOptions} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

    
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexAdminScreen;