import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../../actions/userActions'
import { useEffect, useState } from "react"
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Button } from "react-bootstrap"
import {
  FaUsers, FaUserPlus, FaChalkboardTeacher, FaMoneyBillWave,
  FaClipboardList, FaUserGraduate, FaBook, FaFileInvoiceDollar,
  FaCalendarCheck, FaClipboardCheck, FaUserTie, FaChartBar,
  FaUniversity, FaCog, FaUserEdit
} from "react-icons/fa";
import { PiExam } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import logo from '../../../assets/logo.jpg'

const Sidebar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Adjust these role checks to match your backend's role values
  const role = userInfo?.userData?.role || userInfo?.role;

  const isActive = (path) =>
    location.pathname === path ? 'active' : '';

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ minHeight: "100vh" }}>

      <a href="#" className="brand-link">
        <img src={logo} alt="EVE SMS Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
        <span className="brand-text font-weight-light">EVE SMS</span>
      </a>

      <div className="sidebar">

        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            {userInfo && userInfo.userData.photo && (
              <img src={userInfo.userData.photo} className="img-circle elevation-2" alt="User" />
            )}
          </div>
          <div className="info">
            <a className="d-block">{userInfo && userInfo.firstName}</a>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            {/* ============ DASHBOARD (everyone) ============ */}
            <li className="nav-item">
              <NavLink to="/" className={`nav-link ${isActive('/')}`}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>

            {/* ============ ADMIN MENU ============ */}
            {(!role || role === 'admin') && (
              <>
                <li className="nav-header">STUDENTS</li>
                <li className="nav-item">
                  <NavLink to="/admin/allStudents" className={`nav-link ${isActive('/admin/allStudents')}`}>
                    <FaUsers />
                    <p>All Students</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/admission" className={`nav-link ${isActive('/admin/admission')}`}>
                    <FaUserPlus />
                    <p>Admit Student</p>
                  </NavLink>
                </li>

                <li className="nav-header">STAFF</li>
                <li className="nav-item">
                  <NavLink to="/admin/allLecturers" className={`nav-link ${isActive('/admin/allLecturers')}`}>
                    <FaChalkboardTeacher />
                    <p>All Lecturers</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/add_lecturer" className={`nav-link ${isActive('/admin/add_lecturer')}`}>
                    <FaUserPlus />
                    <p>Add Lecturer</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/allAccountants" className={`nav-link ${isActive('/admin/allAccountants')}`}>
                    <FaChalkboardTeacher />
                    <p>All Accountants</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/add_accountant" className={`nav-link ${isActive('/admin/add_accountant')}`}>
                    <FaUserPlus />
                    <p>Add Accountant</p>
                  </NavLink>
                </li>

                <li className="nav-header">ACADEMICS</li>
                <li className="nav-item">
                  <NavLink to="/admin/programs" className={`nav-link ${isActive('/admin/programs')}`}>
                    <FaBook />
                    <p>Programs</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/admin/departments"
                    className={`nav-link ${isActive('/admin/departments')}`}
                  >
                    <FaUniversity />
                    <p>Departments</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/admin/exam_schedule" className={`nav-link ${isActive('/admin/exam_schedule')}`}>
                    <PiExam />
                    <p>Exam Schedule</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/exam_grade" className={`nav-link ${isActive('/admin/exam_grade')}`}>
                    <FaClipboardCheck />
                    <p>Exam Grading</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/process-results" className={`nav-link ${isActive('/admin/process-results')}`}>
                    <FaCog />
                    <p>Process Results</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/department-reports" className={`nav-link ${isActive('/admin/department-reports')}`}>
                    <FaChartBar />
                    <p>Department Reports</p>
                  </NavLink>
                </li>

                <li className="nav-header">FINANCE</li>
                <li className="nav-item">
                  <NavLink to="/admin/allfee" className={`nav-link ${isActive('/admin/allfee')}`}>
                    <FaMoneyBillWave />
                    <p>All Fees Collection</p>
                  </NavLink>
                </li>
              </>
            )}

            {/* ============ STUDENT MENU ============ */}
            {role === 'student' && (
              <>
                <li className="nav-header">MY ACADEMICS</li>
                <li className="nav-item">
                  <NavLink to="/student/registration" className={`nav-link ${isActive('/student/registration')}`}>
                    <FaUserEdit />
                    <p>Course Registration</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/student/academic-record" className={`nav-link ${isActive('/student/academic-record')}`}>
                    <FaClipboardList />
                    <p>Academic Record</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/student/available-exams" className={`nav-link ${isActive('/student/available-exams')}`}>
                    <PiExam />
                    <p>Available Exams</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/student/my_exam" className={`nav-link ${isActive('/student/my_exam')}`}>
                    <FaClipboardCheck />
                    <p>My Exam Results</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/student/my_attendance" className={`nav-link ${isActive('/student/my_attendance')}`}>
                    <FaCalendarCheck />
                    <p>My Attendance</p>
                  </NavLink>
                </li>

                <li className="nav-header">FINANCE</li>
                <li className="nav-item">
                  <NavLink to="/student/my_fees" className={`nav-link ${isActive('/student/my_fees')}`}>
                    <FaMoneyBillWave />
                    <p>My Fees</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/student/invoice" className={`nav-link ${isActive('/student/invoice')}`}>
                    <FaFileInvoiceDollar />
                    <p>Invoice</p>
                  </NavLink>
                </li>

                <li className="nav-header">ACCOUNT</li>
                <li className="nav-item">
                  <NavLink to="/student/my_profile" className={`nav-link ${isActive('/student/my_profile')}`}>
                    <FaUserGraduate />
                    <p>My Profile</p>
                  </NavLink>
                </li>
              </>
            )}

            {/* ============ PARENT MENU ============ */}
            {role === 'parent' && (
              <>
                <li className="nav-header">MY CHILD</li>
                <li className="nav-item">
                  <NavLink to="/parent/exam" className={`nav-link ${isActive('/parent/exam')}`}>
                    <PiExam />
                    <p>Exam Results</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/parent/my_profile" className={`nav-link ${isActive('/parent/my_profile')}`}>
                    <FaUserTie />
                    <p>My Profile</p>
                  </NavLink>
                </li>
              </>
            )}

            {/* ============ ACCOUNTANT MENU ============ */}
            {role === 'accountant' && (
              <>
                <li className="nav-header">FINANCE</li>
                <li className="nav-item">
                  <NavLink to="/accountant/fee" className={`nav-link ${isActive('/accountant/fee')}`}>
                    <FaMoneyBillWave />
                    <p>Fee Management</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/accountant/payments" className={`nav-link ${isActive('/accountant/payments')}`}>
                    <FaFileInvoiceDollar />
                    <p>Payments</p>
                  </NavLink>
                </li>
              </>
            )}

            {/* ============ LECTURER MENU ============ */}
            {role === 'lecturer' && (
              <>
                <li className="nav-header">TEACHING</li>
                <li className="nav-item">
                  <NavLink to="/lecturer/my_students" className={`nav-link ${isActive('/lecturer/my_students')}`}>
                    <FaUsers />
                    <p>My Students</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/lecturer/grades" className={`nav-link ${isActive('/lecturer/grades')}`}>
                    <FaClipboardCheck />
                    <p>Grade Students</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/lecturer/profile" className={`nav-link ${isActive('/lecturer/profile')}`}>
                    <FaChalkboardTeacher />
                    <p>My Profile</p>
                  </NavLink>
                </li>
              </>
            )}

            {/* ============ LOGOUT (everyone) ============ */}
            <li className="nav-item mt-3" onClick={logoutHandler}>
              <Button variant="danger" className="w-100 btn-sm">
                <MdLogout /> LOGOUT
              </Button>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar