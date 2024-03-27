import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../../actions/userActions'
import { useEffect, useState } from "react"


const Topbar = () => {
  const dispatch = useDispatch()

 
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
              Parent Dashboard
          </li>
        
        </ul>
    
        
        <ul class="navbar-nav ml-auto">
    
    
          <li class="nav-item">
          <div className="live-date-time  text-muted" style={{paddingLeft: "0.8rem"}}>
            {currentDateTime.toLocaleString()}
          </div>
          </li>
          
        </ul>
      </nav>
  )}


  export default Topbar;