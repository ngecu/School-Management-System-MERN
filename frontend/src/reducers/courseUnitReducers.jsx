// courseUnitReducers.js

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
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
    courseUnits: [],
  };
  
  export const courseUnitCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case COURSE_UNIT_CREATE_REQUEST:
        return { ...state, loading: true, success: false, error: null };
      case COURSE_UNIT_CREATE_SUCCESS:
        return { ...state, loading: false, success: true, error: null };
      case COURSE_UNIT_CREATE_FAIL:
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getAllCourseUnitsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_COURSE_UNITS_REQUEST:
        return { ...state, loading: true, success: false, error: null };
      case GET_ALL_COURSE_UNITS_SUCCESS:
        return { ...state, loading: false, success: true, error: null, courseUnits: action.payload };
      case GET_ALL_COURSE_UNITS_FAIL:
        return { ...state, loading: false, success: false, error: action.payload, courseUnits: [] };
      default:
        return state;
    }
  };
  
  export const getCourseUnitsByCourseReducer = (state = { courseUnits: []}, action) => {
    switch (action.type) {
      case GET_COURSE_UNITS_BY_COURSE_REQUEST:
        return {  loading: true, success: false, error: null };
      case GET_COURSE_UNITS_BY_COURSE_SUCCESS:
        return {  loading: false, success: true, error: null, courseUnits: action.payload };
      case GET_COURSE_UNITS_BY_COURSE_FAIL:
        return {  loading: false, success: false, error: action.payload, courseUnits: [] };
      default:
        return state;
    }
  };