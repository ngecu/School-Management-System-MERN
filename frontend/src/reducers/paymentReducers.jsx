// paymentTransactionReducers.js

import { INITIATE_STK_PUSH_FAIL, INITIATE_STK_PUSH_REQUEST, INITIATE_STK_PUSH_SUCCESS } from '../constants/mpesaContants';
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
      PAYMENT_TRANSACTION_BY_FEE_REQUEST,
  PAYMENT_TRANSACTION_BY_FEE_SUCCESS,
  PAYMENT_TRANSACTION_BY_FEE_FAIL,
  } from '../constants/paymentConstants';
  
  // Reducer for fetching all payment transactions
  export const paymentTransactionListReducer = (state = { paymentTransactions: [] }, action) => {
    switch (action.type) {
      case PAYMENT_TRANSACTION_LIST_REQUEST:
        return { loading: true, paymentTransactions: [] };
      case PAYMENT_TRANSACTION_LIST_SUCCESS:
        return { loading: false, paymentTransactions: action.payload };
      case PAYMENT_TRANSACTION_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for fetching a single payment transaction
  export const paymentTransactionDetailsReducer = (state = { paymentTransaction: {} }, action) => {
    switch (action.type) {
      case PAYMENT_TRANSACTION_DETAILS_REQUEST:
        return { loading: true, ...state };
      case PAYMENT_TRANSACTION_DETAILS_SUCCESS:
        return { loading: false, paymentTransaction: action.payload };
      case PAYMENT_TRANSACTION_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for creating a payment transaction
  export const paymentTransactionCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYMENT_TRANSACTION_CREATE_REQUEST:
        return { loading: true };
      case PAYMENT_TRANSACTION_CREATE_SUCCESS:
        return { loading: false, success: true, paymentTransaction: action.payload };
      case PAYMENT_TRANSACTION_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for updating a payment transaction
  export const paymentTransactionUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYMENT_TRANSACTION_UPDATE_REQUEST:
        return { loading: true };
      case PAYMENT_TRANSACTION_UPDATE_SUCCESS:
        return { loading: false, success: true, paymentTransaction: action.payload };
      case PAYMENT_TRANSACTION_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for deleting a payment transaction
  export const paymentTransactionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYMENT_TRANSACTION_DELETE_REQUEST:
        return { loading: true };
      case PAYMENT_TRANSACTION_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PAYMENT_TRANSACTION_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const paymentTransactionByFeeReducer = (state = { paymentTransactions: [] }, action) => {
    switch (action.type) {
      case PAYMENT_TRANSACTION_BY_FEE_REQUEST:
        return { loading: true, paymentTransactions: [] };
      case PAYMENT_TRANSACTION_BY_FEE_SUCCESS:
        return { loading: false, paymentTransactions: action.payload };
      case PAYMENT_TRANSACTION_BY_FEE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const stkPushReducer = (state = {}, action) => {
    switch (action.type) {
      case INITIATE_STK_PUSH_REQUEST:
        return {
          loading: true,
        };
      case INITIATE_STK_PUSH_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case INITIATE_STK_PUSH_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };