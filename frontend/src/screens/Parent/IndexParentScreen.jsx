import { useDispatch, useSelector } from 'react-redux';
import {  useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar';
import { listParentStudents } from '../../actions/parentActions';
import React, { useEffect, useState } from 'react';
import {Pagination} from 'react-bootstrap'

const IndexParentScreen = () => {
  const location = useLocation();

  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;



  const dispatch = useDispatch();

;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listParentStudents(userInfo.userData._id));
  }, [dispatch])

  const studentList = useSelector((state) => state.parentStudentList);
  const { loading, error, students } = studentList;


    console.log("students are ",students);


  const generateStudentData = () => {

  
    if (students && students.length === 0) {
      return (
        <tr>
          <td colSpan="8"><div className="aler alert-danger">
          No students found
            </div> </td>
        </tr>
      );
    }

    else {
      return (
        <>
          {students && students.map((student) => (
            <React.Fragment key={student._id}>
              <tr key={student._id}>
                <td>{student.admissionNumber} </td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.gender}</td>
                <td>{student.course?.name}</td>     
                <td>{student.email}</td>
                <td>{student.dob && new Date(student.dob).toLocaleDateString()}</td>
                 
              </tr>
            </React.Fragment>
          ))}
          {students && <Pagination>
            {[...Array(Math.ceil(students.length / itemsPerPage)).keys()].map(
              (pageNumber) => (
                <Pagination.Item
                  key={pageNumber + 1}
                  active={pageNumber + 1 === currentPage}
                  onClick={() => paginate(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>}
          
        </>
      );
    }
  
   
   
  };
  
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    

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
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1">{userInfo.firstName} </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{userInfo.email}</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                    </div>
                </div>
                <div class="col-auto">
                    
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
                
                <div class="col-xl-12 col-md-6 mb-4">
    <div class="card h-100">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1">Number of Children</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{userInfo.userData.students.length}</div>
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
                </div>
                </div>
              </div>
            </div>

            <div class="col-xl-12 col-md-6 mb-4">
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">My students</h5>
        </div>
        <div class="card-body">
          
            <table class="table">
                <thead>
                    <tr>
                        <th>ADMISSION NO.</th>
                        <th>NAME</th>
                        <th>GENDER</th>
                        <th>COURSE</th>
                        <th>EMAIL</th>
                        <th>DOB</th>

                    </tr>
                </thead>
                <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
                    {generateStudentData()}
                  </tbody>
            </table>
           
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

export default IndexParentScreen;
