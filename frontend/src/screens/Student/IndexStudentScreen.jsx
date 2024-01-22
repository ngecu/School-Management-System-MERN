import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar';

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

<Topbar/>
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
    <td>Year:</td>
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
                    <div class="text-xs font-weight-bold text-uppercase mb-1">latest grade</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">C - Criminal Law</div>
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
                    <div class="text-xs font-weight-bold text-uppercase mb-1">COURSE</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">CRIMINAL LAW</div>
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
                    <div class="text-xs font-weight-bold text-uppercase mb-1">COURSE UNITS</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">2</div>
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
                <div class="col-md-9">
                    <input type="text" class="form-control" placeholder="Exam Name"/>
                </div>
               
                <div class="col-md-3 ">
                    <button class="btn btn-primary w-100">Search</button>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Exam Type</th>
                        <th>Course Unit</th>
                        <th>Grade</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Main</td>
                        <td>Criminal Law</td>
                        <td>A</td>
                        <td>2023-01-01</td>
                    </tr>
                  

                    <tr>
                        <td>Cat</td>
                        <td>Criminal Law</td>
                        <td>C</td>
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
