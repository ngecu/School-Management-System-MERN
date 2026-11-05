import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import {
  FaUsers, FaUserPlus, FaChalkboardTeacher, FaMoneyBillWave,
  FaClipboardList, FaUserGraduate, FaBook, FaFileInvoiceDollar,
  FaCalendarCheck, FaClipboardCheck, FaUserTie, FaChartBar,
  FaUniversity, FaCog, FaUserEdit, FaTachometerAlt
} from 'react-icons/fa';
import { PiExam } from 'react-icons/pi';
import { MdLogout } from 'react-icons/md';

import { logout } from '../../../actions/userActions';
import logo from '../../../assets/logo.jpg';
import React from 'react';

/* ============================================================
   MENU CONFIGURATION
   Grouped by role with section headers.
   ============================================================ */
const MENU_CONFIG = {
  common: {
    header: null,
    items: [
      { to: '/', label: 'Dashboard', icon: <FaTachometerAlt />, exact: true },
    ],
  },
  admin: [
    {
      header: 'STUDENTS',
      items: [
        { to: '/admin/allStudents', label: 'All Students', icon: <FaUsers /> },
        { to: '/admin/admission', label: 'Admit Student', icon: <FaUserPlus /> },
      ],
    },
    {
      header: 'STAFF',
      items: [
        { to: '/admin/allLecturers', label: 'All Lecturers', icon: <FaChalkboardTeacher /> },
        { to: '/admin/add_lecturer', label: 'Add Lecturer', icon: <FaUserPlus /> },
        { to: '/admin/allAccountants', label: 'All Accountants', icon: <FaChalkboardTeacher /> },
        { to: '/admin/add_accountant', label: 'Add Accountant', icon: <FaUserPlus /> },
      ],
    },
    {
      header: 'ACADEMICS',
      items: [
        { to: '/admin/programs', label: 'Programs', icon: <FaBook /> },
        { to: '/admin/departments', label: 'Departments', icon: <FaUniversity /> },
        { to: '/admin/exam_schedule', label: 'Exam Schedule', icon: <PiExam /> },
        { to: '/admin/exam_grade', label: 'Exam Grading', icon: <FaClipboardCheck /> },
        { to: '/admin/process-results', label: 'Process Results', icon: <FaCog /> },
        { to: '/admin/department-reports', label: 'Department Reports', icon: <FaChartBar /> },
      ],
    },
    {
      header: 'FINANCE',
      items: [
        { to: '/admin/allfee', label: 'All Fees Collection', icon: <FaMoneyBillWave /> },
      ],
    },
  ],
  student: [
    {
      header: 'MY ACADEMICS',
      items: [
        { to: '/student/registration', label: 'Course Registration', icon: <FaUserEdit /> },
        { to: '/student/academic-record', label: 'Academic Record', icon: <FaClipboardList /> },
        { to: '/student/available-exams', label: 'Available Exams', icon: <PiExam /> },
        { to: '/student/my_exam', label: 'My Exam Results', icon: <FaClipboardCheck /> },
        { to: '/student/my_attendance', label: 'My Attendance', icon: <FaCalendarCheck /> },
      ],
    },
    {
      header: 'FINANCE',
      items: [
        { to: '/student/my_fees', label: 'My Fees', icon: <FaMoneyBillWave /> },
        { to: '/student/invoice', label: 'Invoice', icon: <FaFileInvoiceDollar /> },
      ],
    },
    {
      header: 'ACCOUNT',
      items: [
        { to: '/student/my_profile', label: 'My Profile', icon: <FaUserGraduate /> },
      ],
    },
  ],
  parent: [
    {
      header: 'MY CHILD',
      items: [
        { to: '/parent/exam', label: 'Exam Results', icon: <PiExam /> },
        { to: '/parent/my_profile', label: 'My Profile', icon: <FaUserTie /> },
      ],
    },
  ],
  accountant: [
    {
      header: 'FINANCE',
      items: [
        { to: '/accountant/fee', label: 'Fee Management', icon: <FaMoneyBillWave /> },
        { to: '/accountant/payments', label: 'Payments', icon: <FaFileInvoiceDollar /> },
      ],
    },
  ],
  lecturer: [
    {
      header: 'TEACHING',
      items: [
        { to: '/lecturer/my_students', label: 'My Students', icon: <FaUsers /> },
        { to: '/lecturer/grades', label: 'Grade Students', icon: <FaClipboardCheck /> },
        { to: '/lecturer/profile', label: 'My Profile', icon: <FaChalkboardTeacher /> },
      ],
    },
  ],
};

/* ============================================================
   REUSABLE SUBCOMPONENTS
   ============================================================ */

const NavItem = ({ to, label, icon, exact = false, isActive }) => (
  <li className="nav-item">
    <NavLink
      to={to}
      exact={exact}
      className={`nav-link ${isActive(to, exact) ? 'active' : ''}`}
    >
      <span className="nav-icon">{icon}</span>
      <p>{label}</p>
    </NavLink>
  </li>
);

const NavHeader = ({ title }) => (
  <li className="nav-header">{title}</li>
);

/* ============================================================
   MAIN SIDEBAR COMPONENT
   ============================================================ */

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) history.push('/');
  }, [userInfo, history]);

  // Live clock
  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const role = userInfo?.userData?.role || userInfo?.role || 'admin';
  const displayName = userInfo?.userData?.firstName || userInfo?.firstName || 'User';
  const displayPhoto = userInfo?.userData?.photo || userInfo?.photo;

  // Active check (supports nested routes)
  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const logoutHandler = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
    }
  };

  // Resolve menu sections based on role
  const roleSections = MENU_CONFIG[role] || [];

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* ===== Brand Logo ===== */}
      <a href="/" className="brand-link">
        <img
          src={logo}
          alt="EVE SMS Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.85 }}
        />
        <span className="brand-text font-weight-light">EVE SMS</span>
      </a>

      <div
        className="sidebar d-flex flex-column"
        style={{ height: 'calc(100vh - 57px)', overflowY: 'auto' }}
      >
        {/* ===== User Panel ===== */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center px-3">
          <div className="image">
            <img
              src={displayPhoto || 'https://via.placeholder.com/40'}
              className="img-circle elevation-2"
              alt="User"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
          </div>
          <div className="info ml-2">
            <div className="d-block text-white font-weight-bold">{displayName}</div>
            <Badge variant="info" className="text-uppercase" style={{ fontSize: '10px' }}>
              {role}
            </Badge>
          </div>
        </div>

        {/* ===== Date / Time ===== */}
        <div className="px-3 pb-2 text-light" style={{ fontSize: '12px', opacity: 0.75 }}>
          {currentDateTime.toLocaleDateString()} • {currentDateTime.toLocaleTimeString()}
        </div>

        {/* ===== Navigation ===== */}
        <nav className="mt-1 flex-grow-1">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Common items (Dashboard) — visible to everyone */}
            {MENU_CONFIG.common.items.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                isActive={isActive}
              />
            ))}

            {/* Role-specific sections */}
            {roleSections.map((section, idx) => (
              <React.Fragment key={idx}>
                {section.header && <NavHeader title={section.header} />}
                {section.items.map((item) => (
                  <NavItem
                    key={item.to}
                    {...item}
                    isActive={isActive}
                  />
                ))}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        {/* ===== Logout (footer, always visible) ===== */}
        <div className="p-3 border-top border-secondary">
          <Button
            variant="outline-danger"
            className="w-100 btn-sm font-weight-bold d-flex align-items-center justify-content-center"
            onClick={logoutHandler}
          >
            <MdLogout className="mr-2" /> LOGOUT
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;