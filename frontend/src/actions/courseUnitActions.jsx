// courseUnitActions.js

import axios from 'axios';
import {
  COURSE_UNIT_CREATE_REQUEST,
  COURSE_UNIT_CREATE_SUCCESS,
  COURSE_UNIT_CREATE_FAIL,
  GET_ALL_COURSE_UNITS_REQUEST,
  GET_ALL_COURSE_UNITS_SUCCESS,
  GET_ALL_COURSE_UNITS_FAIL,
  GET_COURSE_UNITS_BY_COURSE_REQUEST,
  GET_COURSE_UNITS_BY_COURSE_SUCCESS,
  GET_COURSE_UNITS_BY_COURSE_FAIL,
} from '../constants/courseUnitConstants';

const base_url = `http://localhost:5000/api/courseunits`;

export const createCourseUnit = (courseUnitData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_UNIT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${base_url}`, courseUnitData, config);

    dispatch({
      type: COURSE_UNIT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_UNIT_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getAllCourseUnits = () => async (dispatch,getState) => {
  try {
    dispatch({ type: GET_ALL_COURSE_UNITS_REQUEST });

    const { data } = await axios.get(`${base_url}`);

    dispatch({
      type: GET_ALL_COURSE_UNITS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_COURSE_UNITS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getCourseUnitsByCourseA = (courseID) => async (dispatch,getState) => {
  try {
    dispatch({ type: GET_COURSE_UNITS_BY_COURSE_REQUEST });
    console.log("I am working");
    const { data } = await axios.get(`${base_url}/${courseID}`);

    dispatch({
      type: GET_COURSE_UNITS_BY_COURSE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_COURSE_UNITS_BY_COURSE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
