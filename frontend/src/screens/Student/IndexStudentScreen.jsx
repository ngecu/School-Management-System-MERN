import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'

const IndexStudentScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };


  return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  


  
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
   
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    
    </ul>

    
    <ul class="navbar-nav ml-auto">


      
     
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

     
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-comments"></i>
          <span class="badge badge-danger navbar-badge">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item">
          
            <div class="media">
              <img src="dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Brad Diesel
                  <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">Call me whenever you can...</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
       
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
           
            <div class="media">
              <img src="dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  John Pierce
                  <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">I got your message bro</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
          
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
           
            <div class="media">
              <img src="dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Nora Silvester
                  <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">The subject goes here</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>
     
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true"  role="button">
          <i class="fas fa-th-large"></i>
          <i class="fas fa-right-from-bracket"></i>
        </a>
      </li>
    </ul>
  </nav>
  
        <Sidebar />
        <div class="content-wrapper">

        <section class="content">
      <div class="container-fluid">

        <div class="row pt-3">
     
            <div class="col-xl-4 col-md-6 mb-4">

              <div className="row">
                <div className="col-xl-12 col-md-6 mb-4">
                <div class="card h-100">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col-xl-12 col-md-12 mr-2">
                    <div class="no-gutters align-items-center">
                      <div class="text-xs font-weight-bold text-uppercase mb-1 text-center">
                        <img src={userInfo.userData.photo} width={100} alt="" />
                      </div>

                      <div class="mt-2 mb-0 text-muted text-xs">
                       
                      </div>
                      </div>
                    </div>
                    <div class="col-xl-12 col-md-12 mr-2">
                    <table className='w-100'>
                    <tbody>
  <tr>
    <td>Email:</td>
    <th>{userInfo.email}</th>
  </tr>

  <tr>
    <td>First Name:</td>
    <th>{userInfo.userData.firstName}</th>
  </tr>
  <tr>
    <td>Last Name:</td>
    <th>{userInfo.userData.lastName}</th>
  </tr>
  <tr>
    <td>Gender:</td>
    <th>{userInfo.userData.gender}</th>
  </tr>
  <tr>
    <td>Date of Birth:</td>
    <th>{userInfo.userData.dob}</th>
  </tr>

  <tr>
    <td>Religion:</td>
    <th>{userInfo.userData.religion}</th>
  </tr>

  <tr>
    <td>Phone Number:</td>
    <th>{userInfo.userData.phone}</th>
  </tr>

</tbody>

    </table>
                    </div>
                  </div>
                </div>
              </div>
                </div>

                <div className="col-xl-12 col-md-6 mb-4">
                <div class="card h-100">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                 
                    <div class="col-xl-12 col-md-12 mr-2">
                    <table className='w-100'>
                    <tbody>
  <tr>
    <td>Rem School Fees:</td>
    <th>Ksh.100</th>
  </tr>

  <tr>
    <td>Year of Study:</td>
    <th>1</th>
  </tr>
  <tr>
    <td>Yeah:</td>
    <th>2024</th>
  </tr>
  <tr>
    <td>Gender:</td>
    <th>{userInfo.userData.gender}</th>
  </tr>
  <tr>
    <td>Date of Birth:</td>
    <th>{userInfo.userData.dob}</th>
  </tr>

  <tr>
    <td>Religion:</td>
    <th>{userInfo.userData.religion}</th>
  </tr>



</tbody>

    </table>
                    </div>
                  </div>
                </div>
              </div>
                </div>
              </div>
             
            </div>

            <div class="col-xl-8 col-md-6 mb-4">
              <div className="row">
              <div class="col-xl-12 col-md-6 mb-4">
                <div className="row">
                
                <div class="col-xl-4 col-md-6 mb-4">
    <div class="card h-100">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1">Notifications</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">20</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                    </div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-bell fa-2x text-warning"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-xl-4 col-md-6 mb-4">
    <div class="card h-100">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1">Events</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">20</div>
                    <div class="mt-2 mb-0 text-muted text-xs">

                    </div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-calendar-alt fa-2x text-success"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-xl-4 col-md-6 mb-4">
    <div class="card h-100">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1">Attendance</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">20</div>
                    <div class="mt-2 mb-0 text-muted text-xs">

                    </div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-user-check fa-2x text-info"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-xl-12 col-md-6 mb-4">
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">Exams</h5>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Exam Name"/>
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Course Unit"/>
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Grade"/>
                </div>
                <div class="col-md-3 ">
                    <button class="btn btn-primary w-100">Search</button>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Exam Name</th>
                        <th>Course Unit</th>
                        <th>Grade</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Exam 1</td>
                        <td>Mathematics</td>
                        <td>A</td>
                        <td>2023-01-01</td>
                    </tr>
                  

                    <tr>
                        <td>Exam 2</td>
                        <td>Science</td>
                        <td>B</td>
                        <td>2023-02-01</td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>



                </div>
                </div>
              </div>
            </div>
       
        </div>

        
        </div>

        </section>
        </div>
       


</div>

    </div>
  );
};

export default IndexStudentScreen;
