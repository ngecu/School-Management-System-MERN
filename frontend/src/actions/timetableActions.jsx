import axios from 'axios';
import {
  TIMETABLE_LIST_REQUEST,
  TIMETABLE_LIST_SUCCESS,
  TIMETABLE_LIST_FAIL,
  TIMETABLE_DETAILS_REQUEST,
  TIMETABLE_DETAILS_SUCCESS,
  TIMETABLE_DETAILS_FAIL,
  TIMETABLE_CREATE_REQUEST,
  TIMETABLE_CREATE_SUCCESS,
  TIMETABLE_CREATE_FAIL,
  TIMETABLE_UPDATE_REQUEST,
  TIMETABLE_UPDATE_SUCCESS,
  TIMETABLE_UPDATE_FAIL,
  TIMETABLE_DELETE_REQUEST,
  TIMETABLE_DELETE_SUCCESS,
  TIMETABLE_DELETE_FAIL,
  TIMETABLE_BY_COURSE_REQUEST,
  TIMETABLE_BY_COURSE_SUCCESS,
  TIMETABLE_BY_COURSE_FAIL,
} from '../constants/timetableConstants';

const base_url = `http://localhost:5000/api/timetable`
// Get list of timetables
export const listTimetables = () => async (dispatch) => {
  try {
    dispatch({ type: TIMETABLE_LIST_REQUEST });

    const { data } = await axios.get('/api/timetables');

    dispatch({
      type: TIMETABLE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIMETABLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get timetable details by ID
export const getTimetableDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TIMETABLE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/timetables/${id}`);

    dispatch({
      type: TIMETABLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIMETABLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create a new timetable
export const createTimetable = (timetableData) => async (dispatch) => {
  try {
    dispatch({ type: TIMETABLE_CREATE_REQUEST });

    const { data } = await axios.post('/api/timetables', timetableData);

    dispatch({
      type: TIMETABLE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIMETABLE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update timetable details
export const updateTimetable = (id, timetableData) => async (dispatch) => {
  try {
    dispatch({ type: TIMETABLE_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/timetables/${id}`, timetableData);

    dispatch({
      type: TIMETABLE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIMETABLE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete a timetable
export const deleteTimetable = (id) => async (dispatch) => {
  try {
    dispatch({ type: TIMETABLE_DELETE_REQUEST });

    await axios.delete(`/api/timetables/${id}`);

    dispatch({ type: TIMETABLE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TIMETABLE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get timetables by course
export const getTimetableByCourse = (courseId) => async (dispatch) => {
  try {
    dispatch({ type: TIMETABLE_BY_COURSE_REQUEST });

    const { data } = await axios.get(`${base_url}/byCourse/${courseId}`);

    dispatch({
      type: TIMETABLE_BY_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIMETABLE_BY_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
