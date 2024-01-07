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
  
  export const timetableListReducer = (state = { timetables: [] }, action) => {
    switch (action.type) {
      case TIMETABLE_LIST_REQUEST:
        return { loading: true, timetables: [] };
      case TIMETABLE_LIST_SUCCESS:
        return { loading: false, timetables: action.payload };
      case TIMETABLE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const timetableDetailsReducer = (state = { timetable: {} }, action) => {
    switch (action.type) {
      case TIMETABLE_DETAILS_REQUEST:
        return { loading: true, ...state };
      case TIMETABLE_DETAILS_SUCCESS:
        return { loading: false, timetable: action.payload };
      case TIMETABLE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const timetableCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case TIMETABLE_CREATE_REQUEST:
        return { loading: true };
      case TIMETABLE_CREATE_SUCCESS:
        return { loading: false, success: true, timetable: action.payload };
      case TIMETABLE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const timetableUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case TIMETABLE_UPDATE_REQUEST:
        return { loading: true };
      case TIMETABLE_UPDATE_SUCCESS:
        return { loading: false, success: true, timetable: action.payload };
      case TIMETABLE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const timetableDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case TIMETABLE_DELETE_REQUEST:
        return { loading: true };
      case TIMETABLE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case TIMETABLE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const timetableByCourseReducer = (state = { timetable: [] }, action) => {
    switch (action.type) {
      case TIMETABLE_BY_COURSE_REQUEST:
        return { loading: true, timetable: [] };
      case TIMETABLE_BY_COURSE_SUCCESS:
        return { loading: false, timetable: action.payload };
      case TIMETABLE_BY_COURSE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  