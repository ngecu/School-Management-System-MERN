import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {  useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import Topbar from './components/Topbar';
import { getExamResultsByStudents } from '../../actions/examResultActions';
import { listParentStudents } from '../../actions/parentActions';

const ParentStudentExamResultScreen = () => {

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const examResultsByStudents = useSelector(state => state.examResultsByStudents);
  const { loading,error,examResults} = examResultsByStudents;

  const studentList = useSelector((state) => state.parentStudentList);
  const { students } = studentList;


  useEffect(() => {
    dispatch(listParentStudents(userInfo.userData._id));
  }, [dispatch])


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
                            <th>Student</th>
                            <th>Admission No.</th>

                              <th>Exam Type</th>
                              <th>Type</th>
                              <th>Marks</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {examResults.map((result, index) => (
                              <tr key={index}>
                                <td>{result.student.firstName} {result.student.lastName}</td>
                                <td>{result.student.admissionNumber}</td>
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

export default ParentStudentExamResultScreen;
