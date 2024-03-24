import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Topbar from './components/Topbar';


const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = (props) => (
  <div style={{height:"100vh"}}>
    <Calendar
      localizer={localizer}
      // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

const studentExamResultScreen = () => {
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

  const localizer = momentLocalizer(moment) // or globalizeLocalizer

  const MyCalendar = (props) => (
    <div style={{height:"100vh"}}>
      <Calendar
        localizer={localizer}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
    return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">
<Topbar/>
        <Sidebar />
        <div class="content-wrapper">

        <section class="content">
      <div class="container-fluid">

        <div class="row pt-3">
     
        <div class="col-xl-12 col-md-6 mb-4">
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">Exam Results</h5>
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

        </section>
        </div>
       


</div>

    </div>
  );
};

export default studentExamResultScreen;
