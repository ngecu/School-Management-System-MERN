import axios from 'axios';

import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
} from '../constants/courseConstants';

const base_url = `http://localhost:5000/api/courses`;

export const listCourses = () => async (dispatch,getState) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });

    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

    const { data } = await axios.get(base_url,config);

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCourseDetails = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });

    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

    const { data } = await axios.get(`${base_url}/${id}`,config);

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCoursesBySchool = (schoolID) => async (dispatch,getState) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });

    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

    const { data } = await axios.get(`${base_url}/school/${schoolID}`,config);

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};