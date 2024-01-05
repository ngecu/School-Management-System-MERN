import { ATTENDANCE_CREATE_FAIL, ATTENDANCE_CREATE_REQUEST, ATTENDANCE_CREATE_SUCCESS, ATTENDANCE_DETAILS_FAIL, ATTENDANCE_DETAILS_REQUEST, ATTENDANCE_DETAILS_RESET, ATTENDANCE_DETAILS_SUCCESS, ATTENDANCE_LIST_FAIL, ATTENDANCE_LIST_REQUEST, ATTENDANCE_LIST_RESET, ATTENDANCE_LIST_SUCCESS } from "../constants/attendanceConstants";

// Attendance Create Reducers
export const attendanceCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ATTENDANCE_CREATE_REQUEST:
        return { loading: true };
      case ATTENDANCE_CREATE_SUCCESS:
        return { loading: false, success: true, attendance: action.payload };
      case ATTENDANCE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Attendance List Reducers
  export const attendanceListReducer = (state = { attendances: [] }, action) => {
    switch (action.type) {
      case ATTENDANCE_LIST_REQUEST:
        return { loading: true, attendances: [] };
      case ATTENDANCE_LIST_SUCCESS:
        return { loading: false, attendances: action.payload };
      case ATTENDANCE_LIST_FAIL:
        return { loading: false, error: action.payload, attendances: [] };
      case ATTENDANCE_LIST_RESET:
        return { attendances: [] };
      default:
        return state;
    }
  };
  
  // Attendance Details Reducers
  export const attendanceDetailsReducer = (state = { attendance: {} }, action) => {
    switch (action.type) {
      case ATTENDANCE_DETAILS_REQUEST:
        return { ...state, loading: true };
      case ATTENDANCE_DETAILS_SUCCESS:
        return { loading: false, attendance: action.payload };
      case ATTENDANCE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case ATTENDANCE_DETAILS_RESET:
        return { attendance: {} };
      default:
        return state;
    }
  };
  