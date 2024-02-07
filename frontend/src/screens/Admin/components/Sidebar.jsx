import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../../actions/userActions'
import { useEffect, useState } from "react"
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';import { Button } from "react-bootstrap"
import {FaUsers,FaUserPlus,FaChalkboardTeacher,FaMoneyBillWave } from "react-icons/fa";
import { PiExam,PiExamFill  } from "react-icons/pi";
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  useEffect(() => {
    if (!userInfo) {
      alert('Please login first.');
      history.push('/');
    }
  }, [userInfo, history]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  

    return (

<aside class="main-sidebar sidebar-dark-primary elevation-4" style={{minHeight:"100vh"}}>
  
    <a href="#" class="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{opacity: .8}}/>
      <span class="brand-text font-weight-light">EVE SMS</span>
    </a>


    <div class="sidebar">



      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src={userInfo && userInfo.userData.photo} class="img-circle elevation-2" alt="User Image"/>
        </div>
        <div class="info">
          <a  class="d-block">{userInfo && userInfo.firstName}</a>
        </div>
      </div>

    

      {/* <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div> */}

  
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column"  data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item menu-open">
            <NavLink to="/" class={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
               
              </p>
            </NavLink>
        
          </li>

          <li class="nav-item">
              <NavLink to="/admin/allStudents" class={`nav-link ${location.pathname === '/admin/allStudents' ? 'active' : ''}`}>
              <FaUsers />
                  <p>All Students</p>
                </NavLink>
              </li>
        
              <li class="nav-item">
              <NavLink to="/admin/admission" class={`nav-link ${location.pathname === '/admin/admission' ? 'active' : ''}`}>
              <FaUserPlus />
                  <p>Admit Student</p>
                </NavLink>
              </li>

              <li class="nav-item">
              <NavLink to="/admin/allLecturers" class={`nav-link ${location.pathname === '/admin/allLecturers' ? 'active' : ''}`}>
              <FaChalkboardTeacher />
              
                  <p>All Lecturers</p>
                </NavLink>
              </li>
              <li class="nav-item">
              <NavLink to="/admin/add_lecturer" class={`nav-link ${location.pathname === '/admin/add_lecturer' ? 'active' : ''}`}>
              <FaUserPlus />
                  <p>Add Lecturer</p>
                </NavLink>
              </li>
             
              <li class="nav-item">
              <NavLink to="/admin/add_accountant" class={`nav-link ${location.pathname === '/admin/add_accountant' ? 'active' : ''}`}>
              <FaUserPlus />
                  <p>Add Accountant</p>
                </NavLink>
              </li>

              <li class="nav-item">
              <NavLink to="/admin/allfee" class={`nav-link ${location.pathname === '/admin/allfee' ? 'active' : ''}`}>
              <FaMoneyBillWave />
                  <p>All Fees Collection</p>
                </NavLink>
              </li>

              <li class="nav-item">
              <NavLink to="/admin/exam_schedule" class={`nav-link ${location.pathname === '/admin/exam_schedule' ? 'active' : ''}`}>
              <PiExam />
                  <p>Exam Schedule</p>
                </NavLink>
              </li>
              {/* <li class="nav-item">
              <NavLink to="/admin/exam_grade" class={`nav-link ${location.pathname === '/admin/exam_grade' ? 'active' : ''}`}>
              <PiExamFill />
                  <p>Exam Grade</p>
                </NavLink>
              </li> */}
          
          {/* <li class="nav-item">
          <NavLink to="/allAttedance" class={`nav-link ${location.pathname === '/allAttedance' ? 'active' : ''}`}>
            <i class="nav-icon fas fa-person"></i>
              <p>
                Attendance
                
              </p>
            </NavLink>
          
          </li> */}


          {/* <li class="nav-item">
          <NavLink to="/admin/chat" class={`nav-link ${location.pathname === '/admin/chat' ? 'active' : ''}`}>
            <i class="nav-icon fas fa-person"></i>
            <p>Message</p>
          </NavLink>
        </li> */}


        <li class="nav-item" onClick={logoutHandler}>
          <Button variant="danger" className="w-100 btn-sm" >
          <MdLogout /> LOGOUT
          </Button>
        </li>
        
        
        </ul>
      </nav>
      
    </div>
  
  </aside>

  )}


  export default Sidebar;