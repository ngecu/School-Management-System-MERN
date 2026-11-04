import axios from 'axios';
import {
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_CREATE_REQUEST,
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_UPDATE_FAIL,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_DELETE_FAIL,
} from '../constants/departmentConstants';

const base_url = `http://localhost:5000/api/departments`;


export const listDepartments = () => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_LIST_REQUEST });
    const { data } = await axios.get(base_url);
    dispatch({ type: DEPARTMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createDepartment = (department) => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_CREATE_REQUEST });
    const { data } = await axios.post(base_url, department);
    dispatch({ type: DEPARTMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateDepartment = (id, department) => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_UPDATE_REQUEST });
    const { data } = await axios.put(`${base_url}/${id}`, department);
    dispatch({ type: DEPARTMENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_DELETE_REQUEST });
    await axios.delete(`${base_url}/${id}`);
    dispatch({ type: DEPARTMENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};