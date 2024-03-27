import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../../actions/userActions'
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { Button } from "react-bootstrap"
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  

    return (

<aside class="main-sidebar sidebar-dark-primary elevation-4" style={{minHeight:"100vh"}}>
  
    <a href="#" class="brand-link">
    <img src="https://raw.githubusercontent.com/ngecu/PHP-School-Management-System/main/img/logo/attnlg.jpg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{opacity: .8}}/>
      <span class="brand-text font-weight-light">EVE SMS</span>
    </a>


    <div class="sidebar">

    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          {userInfo.userData.photo &&         <img src={userInfo.length > 0 && userInfo.userData.photo} class="img-circle elevation-2" alt="User Image"/>
}
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

  
<nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <NavLink to="/" className={`nav-link ${location.pathname === '/' ? 'active' : '/'}`}>
            <i className="nav-icon fas fa-tachometer-alt"></i>
            <p>Dashboard</p>
          </NavLink>
        </li>
{/* 
        <li className="nav-item">
          <NavLink to="/my_attendance" className={`nav-link ${location.pathname === '/my_attendance' ? 'active' : ''}`}>
            <i className="nav-icon fas fa-calendar-check"></i>
            <p>Attendance</p>
          </NavLink>
        </li> */}

        <li className="nav-item">
          <NavLink to="/parent/exam" className={`nav-link ${location.pathname === '/my_exam_results' ? 'active' : ''}`}>
            <i className="nav-icon fas fa-poll"></i>
            <p>Student Exam Result</p>
          </NavLink>
        </li>

         

<li className="nav-item">
  <NavLink to="/parent/my_profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
    <i className="nav-icon fas fa-user"></i>
    <p>Profile</p>
  </NavLink>
</li>


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