// courseUnitReducers.js

import {
    COURSE_UNIT_CREATE_REQUEST,
    COURSE_UNIT_CREATE_SUCCESS,
    COURSE_UNIT_CREATE_FAIL,
    GET_ALL_COURSE_UNITS_REQUEST,
    GET_ALL_COURSE_UNITS_SUCCESS,
    GET_ALL_COURSE_UNITS_FAIL,
  } from '../constants/courseUnitConstants';
  
  export const courseUnitCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case COURSE_UNIT_CREATE_REQUEST:
        return { loading: true };
      case COURSE_UNIT_CREATE_SUCCESS:
        return { loading: false, success: true, courseUnit: action.payload };
      case COURSE_UNIT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getAllCourseUnitsReducer = (state = { courseUnits: [] }, action) => {
    switch (action.type) {
      case GET_ALL_COURSE_UNITS_REQUEST:
        return { loading: true };
      case GET_ALL_COURSE_UNITS_SUCCESS:
        return { loading: false, courseUnits: action.payload };
      case GET_ALL_COURSE_UNITS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  