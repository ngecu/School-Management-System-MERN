import axios from 'axios';
import {
  PROGRAM_LIST_REQUEST, PROGRAM_LIST_SUCCESS, PROGRAM_LIST_FAIL,
  PROGRAM_CREATE_REQUEST, PROGRAM_CREATE_SUCCESS, PROGRAM_CREATE_FAIL,
  PROGRAM_CREATE_RESET,
} from '../constants/programConstants';

const base_url = `http://localhost:5000/api/programs`;


export const listPrograms = () => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_LIST_REQUEST });
    const { data } = await axios.get(`${base_url}`);
    dispatch({ type: PROGRAM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROGRAM_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createProgram = (program) => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_CREATE_REQUEST });
    const { data } = await axios.post(`${base_url}`, program);
    dispatch({ type: PROGRAM_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROGRAM_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};