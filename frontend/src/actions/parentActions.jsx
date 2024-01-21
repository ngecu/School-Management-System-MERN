import axios from 'axios';
import {
  PARENT_CREATE_REQUEST,
  PARENT_CREATE_SUCCESS,
  PARENT_CREATE_FAIL,
  PARENT_LIST_REQUEST,
  PARENT_LIST_SUCCESS,
  PARENT_LIST_FAIL,
  PARENT_DETAILS_REQUEST,
  PARENT_DETAILS_SUCCESS,
  PARENT_DETAILS_FAIL,
  PARENT_UPDATE_REQUEST,
  PARENT_UPDATE_SUCCESS,
  PARENT_UPDATE_FAIL,
  PARENT_DELETE_REQUEST,
  PARENT_DELETE_SUCCESS,
  PARENT_DELETE_FAIL,
} from '../constants/parentConstants';

const base_url = `http://localhost:5000/api/parents`

// Create Parent Action
export const createParent = (parentData) => async (dispatch) => {
  try {
    dispatch({ type: PARENT_CREATE_REQUEST });

    // Make API request to create parent
    const { data } = await axios.post(`${base_url}`, parentData);

    dispatch({
      type: PARENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PARENT_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// List Parents Action
export const listParents = () => async (dispatch,getState) => {
  try {
    dispatch({ type: PARENT_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();
  
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };


    // Make API request to get list of parents
    const { data } = await axios.get(`${base_url}`,config);

    dispatch({
      type: PARENT_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PARENT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get Parent Details Action
export const getParentDetails = (parentId) => async (dispatch) => {
  try {
    dispatch({ type: PARENT_DETAILS_REQUEST });

    // Make API request to get parent details
    const { data } = await axios.get(`${base_url}/${parentId}`);

    dispatch({
      type: PARENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PARENT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Update Parent Action
export const updateParent = (parentId, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: PARENT_UPDATE_REQUEST });

    // Make API request to update parent
    const { data } = await axios.put(`/api/parents/${parentId}`, updatedData);

    dispatch({
      type: PARENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PARENT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Delete Parent Action
export const deleteParent = (parentId) => async (dispatch) => {
  try {
    dispatch({ type: PARENT_DELETE_REQUEST });

    // Make API request to delete parent
    await axios.delete(`/api/parents/${parentId}`);

    dispatch({ type: PARENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PARENT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
