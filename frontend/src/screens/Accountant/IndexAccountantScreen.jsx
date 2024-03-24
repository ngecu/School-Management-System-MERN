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
import { listStudents } from '../../actions/studentActions';
import { listLecturers } from '../../actions/lecturerActions';
import { listCourses } from '../../actions/courseActions';
import { listAccountants } from '../../actions/accountantActions';
import { Doughnut } from 'react-chartjs-2';

const IndexAccountantScreen = () => {
  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listStudents());
    dispatch(listLecturers());
    dispatch(listCourses());
    dispatch(listAccountants());

  }, [dispatch]);

  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;

  const lecturerList = useSelector((state) => state.lecturerList);
  const {  lecturers } = lecturerList;


  const coursesList = useSelector((state) => state.courseList);
const { loading: loadingCourses, courses, error: errorCourses } = coursesList;

const data = {
  labels: ['Students', 'Lecturers'],
  datasets: [{
      data: [ students?.length, lecturers.length],
      backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
  }]
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
       <div class="card h-100">
         <div class="card-body">
           <div class="row no-gutters align-items-center">
             <div class="col mr-2">
               <div class="text-xs font-weight-bold text-uppercase mb-1">Students</div>
               <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{students && <>{students.length}</>}</div>
               <div class="mt-2 mb-0 text-muted text-xs">
                
               </div>
             </div>
             <div class="col-auto">
               <i class="fas fa-users fa-2x text-info"></i>
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
                           <div class="text-xs font-weight-bold text-uppercase mb-1">Lecturers</div>
                           <div class="h5 mb-0 font-weight-bold text-gray-800">{lecturers && <>{lecturers.length}</>}</div>
                           <div class="mt-2 mb-0 text-muted text-xs">
                          
                           </div>
                         </div>
                         <div class="col-auto">
                           <i class="fas fa-chalkboard-teacher fa-2x text-danger"></i>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

               
   
     <div class="col-xl-4 col-md-6 mb-4">
       <div class="card h-100">
         <div class="card-body">
           <div class="row align-items-center">
             <div class="col mr-2">
               <div class="text-xs font-weight-bold text-uppercase mb-1">Courses</div>
               <div class="h5 mb-0 font-weight-bold text-gray-800">{courses && <>{courses.length}</>}</div>
               <div class="mt-2 mb-0 text-muted text-xs">
               
               </div>
             </div>
             <div class="col-auto">
               <i class="fas fa-chalkboard fa-2x text-primary"></i>
             </div>
           </div>
         </div>
       </div>
     </div>
 </div>

        <div class="row pt-3">
     
        <div class="col-xl-12 col-md-6 mb-4">

<div className="row">
  <div className="col-xl-12 col-md-6 mb-4">
  <div class="card h-100">
  <div class="card-body">
    <div class="row no-gutters align-items-center">
      <div class="col-xl-12 col-md-12 mr-2">
      <div class="no-gutters align-items-center">
        <div class="text-xs font-weight-bold text-uppercase mb-1 text-center">
          {/* <img src={userInfo.userData.photo} width={100} alt="" /> */}
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
<th>{new Date(userInfo.userData.dob).toLocaleDateString()}</th>
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


</div>

</div>
<div className="col-xl-12 col-md-6 mb-4">
 <div style={{ width: '100%', maxWidth: '400px' }}> {/* Set a max-width to prevent it from overflowing */}
      <Doughnut data={data} />
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

export default IndexAccountantScreen;
