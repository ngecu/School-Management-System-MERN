import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getTimetableByCourse } from '../../actions/timetableActions';
import Topbar from './components/Topbar';


const localizer = momentLocalizer(moment) // or globalizeLocalizer


const studentTimeTableScreen = () => {
  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const timetableByCourse = useSelector((state) => state.timetableByCourse);
  const {
    loading: loadingTimetable,
    timetable: timetableEvents,
    error: errorTimetable,
  } = timetableByCourse;

  useEffect(() => {
    if (userInfo && userInfo.userData && userInfo.userData.course) {
      const courseId = userInfo.userData.course;
      dispatch(getTimetableByCourse(courseId));
    }
  }, [dispatch, userInfo]);


  const localizer = momentLocalizer(moment) // or globalizeLocalizer

  const today = new Date();
  const tomorrow = new Date();
  const currentDate = new Date(); // Current date and time
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth()
  
  const calendarEvents = [];
  
  timetableEvents.forEach((timetableItem) => {
    const {
      _id,
      courseUnit: { name: courseUnitName },
      dayOfWeek,
      startTime,
      endTime,
    } = timetableItem;
  
    // Combine lecturer's first and last name
    console.log("current year ", currentYear);
    
    // Iterate through each day of the month
    for (let day = 1; day <= new Date(currentYear, currentMonth + 1, 0).getDate(); day++) {
      // Replace the year, month, and day parts with the current year, current month, and current day
      const startDate = new Date(`${currentYear}-0${currentMonth + 1}-${day}T${startTime}`);
      const endDate = new Date(`${currentYear}-0${currentMonth + 1}-${day}T${endTime}`);
  
      // Set the day of the week for startDate and endDate
      setDayOfWeek(startDate, dayOfWeek);
      setDayOfWeek(endDate, dayOfWeek);
  
      function setDayOfWeek(date, day) {
        // Convert day of the week string to a number (0 for Sunday, 1 for Monday, etc.)
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayNumber = days.indexOf(day);
  
        // Set the day of the week
        date.setDate(date.getDate() - (date.getDay() - dayNumber + 7) % 7);
      }
  
      // Format the title for the event
      const title = `${courseUnitName}`;
  
      // Add the event to the calendarEvents array
      calendarEvents.push({
        title,
        start: startDate,
        end: endDate,
      });
    }
  });
  
  console.log(calendarEvents);
  

  const MyCalendar = (props) => {
  
  
    return (
      <div style={{ height: '100vh' }}>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
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
     



<div class="col-xl-12 col-md-6 mb-4">
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">My TimeTable</h5>
        </div>
        <div class="card-body">
         
        {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!loading && !error && <MyCalendar  />}


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

export default studentTimeTableScreen;
