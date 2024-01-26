import React, {useCallback, useState, useEffect } from 'react';
import { Table,Form,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import {  Input, Select  , Col, Row } from 'antd';
import { getSchoolDetails, listSchools } from '../../actions/schoolActions';
import { listCourses } from '../../actions/courseActions';
import {useDropzone} from 'react-dropzone'
import { uploadFile } from '../../actions/cloudinaryAtions';
import { updateUserProfile } from '../../actions/userActions';
import Topbar from './components/Topbar';
import { listStudents } from '../../actions/studentActions';


const LecturerMyStudentsScreen = () => {
  

  const dispatch = useDispatch();





  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;

  const schoolDetails = useSelector((state) => state.schoolDetails);
  const { school } = schoolDetails;


  
  useEffect(() => {
    dispatch(listStudents());
    dispatch(getSchoolDetails(userInfo.userData.school))
  }, [dispatch]);

  const filteredStudents =
    students &&
    students.filter((student) =>
      userInfo.userData.courses.includes(student.course._id)
    );

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
              <div class="card h-100">
                <div class="card-body">
                 My School : {school && school.name}
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                  Courses Assigned:  {userInfo && userInfo.userData.courses.length}
                    </div>
                    </div>
            </div>

              <div class="col-xl-4 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                 My Students: {students && <>{filteredStudents .length}</>}
                    </div>
                    </div>
            </div>

               <div class="col-xl-12 col-md-12 mb-4">
              <div class="card h-100">
                <div class="card-body">
                <div className="d-flex justify-content-between align-items-center">
            <h5>MY STUDENTS  Data</h5>
          
          </div>
          <Form inline>
              <Form.Control type="text" placeholder="Search" className="mr-2" />
              <Button variant="primary">Search</Button>
            </Form>

          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Course</th>
         
                <th>Address</th>
                <th>Date Of Birth</th>
            
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
                        {filteredStudents &&
                          filteredStudents.map((student) => (
                            <tr key={student.id}>
                              <td>{student.firstName} {student.lastName}</td>
                              <td>{student.gender}</td>
                              <td>{student.course.name}</td>
                              <td>{student.address}</td>
                              <td>{student.dob}</td>
                              <td>{student.email}</td>
                            </tr>
                          ))}
                      </tbody>
          </Table>
          
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

export default LecturerMyStudentsScreen;
