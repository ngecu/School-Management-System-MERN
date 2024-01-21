// accountantActions.js

import axios from 'axios';
import {
  CREATE_ACCOUNTANT_REQUEST,
  CREATE_ACCOUNTANT_SUCCESS,
  CREATE_ACCOUNTANT_FAILURE,
} from '../constants/accountantConstants';
const base_url = 'http://localhost:5000/api/accountants';

export const createAccountant = (accountantData) => async (dispatch,getState) => {
  try {
    dispatch({ type: CREATE_ACCOUNTANT_REQUEST });

    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };


  
    const response = await axios.post(`${base_url}`, accountantData,config);

    dispatch({
      type: CREATE_ACCOUNTANT_SUCCESS,
      payload: response.data,
    });

    return response.data; // You can return any data you need in your component
  } catch (error) {
    dispatch({
      type: CREATE_ACCOUNTANT_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });

    throw error; // You can handle the error in your component
  }
};
