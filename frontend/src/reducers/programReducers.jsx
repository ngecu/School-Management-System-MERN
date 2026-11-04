import {
  PROGRAM_LIST_REQUEST, PROGRAM_LIST_SUCCESS, PROGRAM_LIST_FAIL,
  PROGRAM_CREATE_REQUEST, PROGRAM_CREATE_SUCCESS, PROGRAM_CREATE_FAIL,
  PROGRAM_CREATE_RESET,
} from '../constants/programConstants';

export const programListReducer = (state = { programs: [] }, action) => {
  switch (action.type) {
    case PROGRAM_LIST_REQUEST:
      return { loading: true, programs: [] };
    case PROGRAM_LIST_SUCCESS:
      return { loading: false, programs: action.payload };
    case PROGRAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const programCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROGRAM_CREATE_REQUEST:
      return { loading: true };
    case PROGRAM_CREATE_SUCCESS:
      return { loading: false, success: true, program: action.payload };
    case PROGRAM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PROGRAM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};