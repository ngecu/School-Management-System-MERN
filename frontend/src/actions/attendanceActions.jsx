import axios from 'axios';
import {
  ATTENDANCE_CREATE_REQUEST,
  ATTENDANCE_CREATE_SUCCESS,
  ATTENDANCE_CREATE_FAIL,
  ATTENDANCE_LIST_REQUEST,
  ATTENDANCE_LIST_SUCCESS,
  ATTENDANCE_LIST_FAIL,
  ATTENDANCE_DETAILS_REQUEST,
  ATTENDANCE_DETAILS_SUCCESS,
  ATTENDANCE_DETAILS_FAIL,
} from '../constants/attendanceConstants';

const base_url = 'http://localhost:5000/api/attendance';

// Action to create attendance
export const createAttendance = (attendanceData) => async (dispatch,getState) => {
  try {
    dispatch({ type: ATTENDANCE_CREATE_REQUEST });

    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };


    // Make API call to create attendance
    const { data } = await axios.post(`${base_url}`, attendanceData,config);

    dispatch({
      type: ATTENDANCE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action to list attendance
export const listAttendance = () => async (dispatch,getState) => {
  try {
    dispatch({ type: ATTENDANCE_LIST_REQUEST });

    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };


    // Make API call to get the list of attendance
    const { data } = await axios.get(`${base_url}`,config);

    dispatch({
      type: ATTENDANCE_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action to get attendance details
export const getAttendanceDetails = (attendanceId) => async (dispatch) => {
  try {
    dispatch({ type: ATTENDANCE_DETAILS_REQUEST });

    // Make API call to get attendance details
    const { data } = await axios.get(`/api/attendance/${attendanceId}`);

    dispatch({
      type: ATTENDANCE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
