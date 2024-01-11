// paymentTransactionActions.js

import axios from 'axios';
import {
  PAYMENT_TRANSACTION_LIST_REQUEST,
  PAYMENT_TRANSACTION_LIST_SUCCESS,
  PAYMENT_TRANSACTION_LIST_FAIL,
  PAYMENT_TRANSACTION_DETAILS_REQUEST,
  PAYMENT_TRANSACTION_DETAILS_SUCCESS,
  PAYMENT_TRANSACTION_DETAILS_FAIL,
  PAYMENT_TRANSACTION_CREATE_REQUEST,
  PAYMENT_TRANSACTION_CREATE_SUCCESS,
  PAYMENT_TRANSACTION_CREATE_FAIL,
  PAYMENT_TRANSACTION_UPDATE_REQUEST,
  PAYMENT_TRANSACTION_UPDATE_SUCCESS,
  PAYMENT_TRANSACTION_UPDATE_FAIL,
  PAYMENT_TRANSACTION_DELETE_REQUEST,
  PAYMENT_TRANSACTION_DELETE_SUCCESS,
  PAYMENT_TRANSACTION_DELETE_FAIL,
  PAYMENT_TRANSACTION_BY_FEE_FAIL,
  PAYMENT_TRANSACTION_BY_FEE_REQUEST,
  PAYMENT_TRANSACTION_BY_FEE_SUCCESS,
} from '../constants/paymentConstants';

const base_url = 'http://localhost:5000/api/payment';

// Action creator to fetch all payment transactions
export const listPaymentTransactions = () => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_TRANSACTION_LIST_REQUEST });

    const { data } = await axios.get(`${base_url}`);

    dispatch({
      type: PAYMENT_TRANSACTION_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_TRANSACTION_LIST_FAIL,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};

// Action creator to fetch a single payment transaction by ID
export const getPaymentTransactionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_TRANSACTION_DETAILS_REQUEST });

    const { data } = await axios.get(`${base_url}/${id}`);

    dispatch({
      type: PAYMENT_TRANSACTION_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_TRANSACTION_DETAILS_FAIL,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};

// Action creator to create a payment transaction
export const createPaymentTransaction = (paymentTransactionData) => async (dispatch,getState) => {
  try {
    dispatch({ type: PAYMENT_TRANSACTION_CREATE_REQUEST });

    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

    const { data } = await axios.post(`${base_url}`, paymentTransactionData,config);

    dispatch({
      type: PAYMENT_TRANSACTION_CREATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_TRANSACTION_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};

// Action creator to update a payment transaction
export const updatePaymentTransaction = (id, paymentTransactionData) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_TRANSACTION_UPDATE_REQUEST });

    const { data } = await axios.put(`${base_url}/${id}`, paymentTransactionData);

    dispatch({
      type: PAYMENT_TRANSACTION_UPDATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_TRANSACTION_UPDATE_FAIL,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};

// Action creator to delete a payment transaction
export const deletePaymentTransaction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_TRANSACTION_DELETE_REQUEST });

    await axios.delete(`${base_url}//${id}`);

    dispatch({ type: PAYMENT_TRANSACTION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PAYMENT_TRANSACTION_DELETE_FAIL,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};


export const listPaymentTransactionsByFee = (feeId) => async (dispatch,getState) => {
    try {
      dispatch({ type: PAYMENT_TRANSACTION_BY_FEE_REQUEST });


      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`${base_url}/fee/${feeId}`,config);
      console.log("fee id is ",data)
  
      dispatch({
        type: PAYMENT_TRANSACTION_BY_FEE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: PAYMENT_TRANSACTION_BY_FEE_FAIL,
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  };