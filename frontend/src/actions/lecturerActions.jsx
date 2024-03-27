import axios from 'axios';
import { LECTURER_CREATE_FAIL, LECTURER_CREATE_REQUEST, LECTURER_CREATE_SUCCESS, LECTURER_DELETE_FAIL, LECTURER_DELETE_REQUEST, LECTURER_DELETE_SUCCESS, LECTURER_DETAILS_REQUEST, LECTURER_LIST_FAIL, LECTURER_LIST_REQUEST, LECTURER_LIST_SUCCESS } from "../constants/lecturerConstants";
import { useHistory } from 'react-router-dom';
const base_url = `http://localhost:5000/api/lecturers`

export const createLecturer = (lecturerData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LECTURER_CREATE_REQUEST,
      });
  
      const { userLogin: { userInfo } } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const response = await axios.post(
        `${base_url}`,
        lecturerData,
        config
      );
  
      dispatch({
        type: LECTURER_CREATE_SUCCESS,
        payload: response.data,
      });


  return response.data;
    } catch (error) {
      dispatch({
        type: LECTURER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  // Lecturer List Action
  export const listLecturers = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: LECTURER_LIST_REQUEST,
      });
  
      const { userLogin: { userInfo } } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`${base_url}`, config);
      
      console.log("lecturers are ",data);
      dispatch({
        type: LECTURER_LIST_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: LECTURER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  // Lecturer Details Action
  export const getLecturerDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LECTURER_DETAILS_REQUEST,
      });
  
      const { userLogin: { userInfo } } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/lecturers/${id}`, config);
  
      dispatch({
        type: LECTURER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LECTURER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  // Lecturer Update Action
  export const updateLecturer = (lecturerData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LECTURER_UPDATE_REQUEST,
      });
  
      const { userLogin: { userInfo } } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/lecturers/${lecturerData._id}`,
        lecturerData,
        config
      );
  
      dispatch({
        type: LECTURER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LECTURER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  // Lecturer Delete Action
  export const deleteLecturer = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LECTURER_DELETE_REQUEST,
      });
  
      const { userLogin: { userInfo } } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`${base_url}/${id}`, config);
  
      dispatch({
        type: LECTURER_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: LECTURER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };