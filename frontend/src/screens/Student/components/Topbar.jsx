import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../../actions/userActions'
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { Button } from "react-bootstrap"

const Topbar = () => {
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


        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
   
        <ul class="navbar-nav">
          <li class="nav-item">
          <div className="live-date-time  text-muted" style={{paddingLeft: "0.8rem"}}>
            {currentDateTime.toLocaleString()}
          </div>
          
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
          </li>
        
        </ul>
    
        
        <ul class="navbar-nav ml-auto">
    
    
          <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
              <i class="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          
        </ul>
      </nav>
  )}


  export default Topbar;