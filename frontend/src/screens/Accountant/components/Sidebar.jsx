import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../../actions/userActions'
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
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

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
          <a  class="d-block">{userInfo.firstName}</a>
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
      <NavLink to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
        <i className="nav-icon fas fa-tachometer-alt"></i>
        <p>Dashboard</p>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/fees" className={`nav-link ${location.pathname === '/fees' ? 'active' : ''}`}>
        <i className="nav-icon fas fa-money-bill"></i>
        <p>Fees Collection</p>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/expenses" className={`nav-link ${location.pathname === '/expenses' ? 'active' : ''}`}>
        <i className="nav-icon fas fa-chart-line"></i>
        <p>Expenses</p>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/add_expense" className={`nav-link ${location.pathname === '/add_expense' ? 'active' : ''}`}>
        <i className="nav-icon fas fa-plus"></i>
        <p>Add Expense</p>
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink to="/chat" className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`}>
        <i className="nav-icon fas fa-envelope"></i>
        <p>Messages</p>
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