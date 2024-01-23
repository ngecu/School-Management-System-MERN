import React, {useCallback, useState, useEffect } from 'react';
import { Table,Form,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import {  Input, Select  , Col, Row } from 'antd';
import { listSchools } from '../../actions/schoolActions';
import { listCourses } from '../../actions/courseActions';
import {useDropzone} from 'react-dropzone'
import { uploadFile } from '../../actions/cloudinaryAtions';
import { updateUserProfile } from '../../actions/userActions';
import Topbar from './components/Topbar';


const LecturerMyStudentsScreen = () => {
  

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


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
                 My School 
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                  Courses Assigned:
                    </div>
                    </div>
            </div>

              <div class="col-xl-4 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                 My Students:
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
