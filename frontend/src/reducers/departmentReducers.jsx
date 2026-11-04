import {
  DEPARTMENT_LIST_REQUEST, DEPARTMENT_LIST_SUCCESS, DEPARTMENT_LIST_FAIL,
  DEPARTMENT_CREATE_REQUEST, DEPARTMENT_CREATE_SUCCESS, DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_CREATE_RESET,
  DEPARTMENT_UPDATE_REQUEST, DEPARTMENT_UPDATE_SUCCESS, DEPARTMENT_UPDATE_FAIL,
  DEPARTMENT_UPDATE_RESET,
  DEPARTMENT_DELETE_REQUEST, DEPARTMENT_DELETE_SUCCESS, DEPARTMENT_DELETE_FAIL,
} from '../constants/departmentConstants';

export const departmentListReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case DEPARTMENT_LIST_REQUEST:
      return { loading: true, departments: [] };
    case DEPARTMENT_LIST_SUCCESS:
      return { loading: false, departments: action.payload };
    case DEPARTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const departmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_CREATE_REQUEST:
      return { loading: true };
    case DEPARTMENT_CREATE_SUCCESS:
      return { loading: false, success: true, department: action.payload };
    case DEPARTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DEPARTMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const departmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_UPDATE_REQUEST:
      return { loading: true };
    case DEPARTMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, department: action.payload };
    case DEPARTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DEPARTMENT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const departmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_DELETE_REQUEST:
      return { loading: true };
    case DEPARTMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEPARTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};