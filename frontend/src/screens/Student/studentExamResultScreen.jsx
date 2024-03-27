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
import { getExamResultsByStudents } from '../../actions/examResultActions';


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

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();



  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const examResultsByStudents = useSelector(state => state.examResultsByStudents);
  const { loading,error,examResults} = examResultsByStudents;

  console.log("user info ",userInfo);
  const students = [userInfo.userData._id]

  useEffect(() => {
    dispatch(getExamResultsByStudents(students));
  }, [dispatch]);

    return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">
<Topbar/>
        <Sidebar />
        <div class="content-wrapper">

        <section class="content">
      <div class="container-fluid">

        <div class="row pt-3">
        {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  <div class="col-xl-12 col-md-6 mb-4">
                    <div class="card">
                      <div class="card-header">
                        <h5 class="mb-0">Exam Results</h5>
                      </div>
                      <div class="card-body">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Exam Type</th>
                              <th>Type</th>
                              <th>Marks</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {examResults.map((result, index) => (
                              <tr key={index}>
                                <td>{result.exam.examType}</td>
                                <td>{result.exam.title}</td>
                                <td>{result.marksObtained}</td>
                                <td>{new Date(result.exam.date).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                    
                      </div>
                    </div>
                  </div>
                )}
        </div>

        
        </div>

        </section>
        </div>
       


</div>

    </div>
  );
};

export default studentExamResultScreen;
