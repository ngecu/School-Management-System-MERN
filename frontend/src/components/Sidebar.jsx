import { useDispatch, useSelector } from "react-redux"
import { logout } from '../actions/userActions'
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { Button } from "react-bootstrap"

const Sidebar = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the date-time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  

    return (

<aside class="main-sidebar sidebar-dark-primary elevation-4" style={{minHeight:"100vh"}}>
  
    <a href="index3.html" class="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{opacity: .8}}/>
      <span class="brand-text font-weight-light">EVE SMS</span>
    </a>


    <div class="sidebar">

    <div className="live-date-time  text-muted" style={{paddingLeft: "0.8rem"}}>
            {currentDateTime.toLocaleString()}
          </div>

      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="https://avatars.githubusercontent.com/u/41146306?v=4" class="img-circle elevation-2" alt="User Image"/>
        </div>
        <div class="info">
          <a href="#" class="d-block">{userInfo.firstName}</a>
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
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-person"></i>
            
              <p>
                Students
                <i class="fas fa-angle-left right"></i>
                {/* <span class="badge badge-info right">6</span> */}
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
              <NavLink to="/allStudents" class={`nav-link ${location.pathname === '/allStudents' ? 'active' : ''}`}>
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Students</p>
                </NavLink>
              </li>
              <li class="nav-item">
              <NavLink to="/admission" class={`nav-link ${location.pathname === '/admission' ? 'active' : ''}`}>
                  <i class="far fa-circle nav-icon"></i>
                  <p>Admission Form</p>
                </NavLink>
              </li>
             
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-person"></i>
              <p>
                Teachers
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/charts/chartjs.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Teachers</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/charts/flot.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add Teacher</p>
                </a>
              </li>
             
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-person"></i>
              <p>
                Parents
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/UI/general.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Parents</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/UI/icons.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Icons</p>
                </a>
              </li>
            
           
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-person"></i>
              <p>
                Library
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/forms/general.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Books</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/forms/advanced.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add New Book</p>
                </a>
              </li>
              
             
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-person"></i>
              <p>
                Accountant
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/tables/simple.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Fees Collection</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/tables/data.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Expenses</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/tables/jsgrid.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add Expenses</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-person"></i>
              <p>
                Attendance
                
              </p>
            </a>
          
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
            <i class="nav-icon fas fa-person"></i>
              <p>
                Exam
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/tables/simple.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Exam Schedule</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/tables/data.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Exam Grade</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/tables/jsgrid.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add Expenses</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
          <NavLink to="/chat" class={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`}>
            <i class="nav-icon fas fa-person"></i>
            <p>Message</p>
          </NavLink>
        </li>


        <li class="nav-item">
          <Button variant="danger" className="w-100" onClick={logoutHandler}>
            <i class="nav-icon fas fa-person"></i>
            <p>LOGOUT</p>
          </Button>
        </li>
        
        
        </ul>
      </nav>
      
    </div>
  
  </aside>

  )}


  export default Sidebar;