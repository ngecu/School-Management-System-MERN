import React, {useCallback, useState, useEffect } from 'react';
import { Table,Form,Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './components/Sidebar'

import { getSchoolDetails, listSchools } from '../../actions/schoolActions';
import Topbar from './components/Topbar';
import { listStudents } from '../../actions/studentActions';


const LecturerMyStudentsScreen = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      userInfo.userData.courses.includes(student?.student?.course?._id)
    );

    const generateStudentData = () => {
      const newFilteredStudents = filteredStudents && filteredStudents.filter(
        (student) =>
        userInfo.userData.courses.includes(student?.student?.course?._id)

        && (

        student.student?.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.student?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.student?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.student?.email.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    
      if (newFilteredStudents && newFilteredStudents.length === 0) {
        return (
          <tr>
            <td colSpan="8"><div className="aler alert-danger">
            No students found
              </div> </td>
          </tr>
        );
      }
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = newFilteredStudents && newFilteredStudents.slice(indexOfFirstItem, indexOfLastItem);
    
      return (
        <>
          {currentItems && currentItems.map((student) => (
            <React.Fragment key={student?._id}>
              <tr key={student.student?._id}>
                <td>{student.student?.admissionNumber} </td>
                <td>{student.student?.firstName} {student.student?.lastName}</td>
                <td>{student.student?.gender}</td>
                <td>{student.student?.course?.name}</td>     
                <td>{student.student?.dob && new Date(student.student.dob).toLocaleDateString()}</td>
                <td>{student.student?.email}</td>
    
              
              </tr>
            </React.Fragment>
          ))}
          { currentItems && currentItems.length > 0 && <>
            <Pagination>
            {[...Array(Math.ceil(currentItems.length / itemsPerPage)).keys()].map(
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
          </Pagination>

          </>}
         
        </>
      );
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
                 My Students: {students && <>{filteredStudents.length}</>}
                    </div>
                    </div>
            </div>

               <div class="col-xl-12 col-md-12 mb-4">
              <div class="card h-100">
                <div class="card-body">
                <div className="d-flex justify-content-between align-items-center">
            <div className='row w-100'>
              <div className="col-md-6">
            <h5>MY STUDENTS  Data</h5>

              </div>
              <div className="col-md-6">
              <Form.Control 
              type="text" 
              placeholder="Search student" 
              className="mr-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}

              />

              </div>
            

             
            </div>
          </div>
          
            
           

          <Table bordered hover responsive>
            <thead>
              <tr>
              <th>Admin No.</th>

                <th>Name</th>
                <th>Gender</th>
                <th>Course</th>
         
                
                <th>Date Of Birth</th>
            
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
                        {generateStudentData()}
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
