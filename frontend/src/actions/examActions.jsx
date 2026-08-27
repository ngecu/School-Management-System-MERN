// examActions.jsx
import axios from 'axios';
import {
  EXAM_CREATE_REQUEST,
  EXAM_CREATE_SUCCESS,
  EXAM_CREATE_FAIL,
  GET_ALL_EXAMS_REQUEST,
  GET_ALL_EXAMS_SUCCESS,
  GET_ALL_EXAMS_FAIL,
  EXAM_DETAILS_REQUEST,
  EXAM_DETAILS_SUCCESS,
  EXAM_DETAILS_FAIL,
  EXAM_UPDATE_REQUEST,
  EXAM_UPDATE_SUCCESS,
  EXAM_UPDATE_FAIL,
  EXAM_DELETE_REQUEST,
  EXAM_DELETE_SUCCESS,
  EXAM_DELETE_FAIL,
  EXAM_REGISTER_REQUEST,
  EXAM_REGISTER_SUCCESS,
  EXAM_REGISTER_FAIL,
  EXAM_BOOK_REQUEST,
  EXAM_BOOK_SUCCESS,
  EXAM_BOOK_FAIL,
  EXAM_CARD_REQUEST,
  EXAM_CARD_SUCCESS,
  EXAM_CARD_FAIL,
  EXAM_BOOKINGS_REQUEST,
  EXAM_BOOKINGS_SUCCESS,
  EXAM_BOOKINGS_FAIL,
  AVAILABLE_EXAMS_REQUEST,
  AVAILABLE_EXAMS_SUCCESS,
  AVAILABLE_EXAMS_FAIL,
  EXAM_ELIGIBILITY_REQUEST,
  EXAM_ELIGIBILITY_SUCCESS,
  EXAM_ELIGIBILITY_FAIL,
  CONFIRM_BOOKING_REQUEST,
  CONFIRM_BOOKING_SUCCESS,
  CONFIRM_BOOKING_FAIL,
  CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAIL
} from '../constants/examConstants';

// @desc    Create a new exam
// @route   POST /api/exams
export const createExam = (examData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_CREATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/exams', examData, config);

    dispatch({
      type: EXAM_CREATE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: EXAM_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error;
  }
};

// @desc    Get all exams
// @route   GET /api/exams
export const getAllExams = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EXAMS_REQUEST });

    const { data } = await axios.get('/api/exams');

    dispatch({
      type: GET_ALL_EXAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EXAMS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// @desc    Get exam details by ID
// @route   GET /api/exams/:id
export const getExamDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EXAM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/exams/${id}`);

    dispatch({
      type: EXAM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXAM_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// @desc    Update an exam
// @route   PUT /api/exams/:id
export const updateExam = (id, examData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/exams/${id}`, examData, config);

    dispatch({
      type: EXAM_UPDATE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: EXAM_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error;
  }
};

// @desc    Delete an exam
// @route   DELETE /api/exams/:id
export const deleteExam = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_DELETE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/exams/${id}`, config);

    dispatch({
      type: EXAM_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: EXAM_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// @desc    Register for an exam (requires 50% fee payment)
// @route   POST /api/exams/:examId/register
export const registerForExam = (examId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_REGISTER_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/exams/${examId}/register`, {}, config);

    dispatch({
      type: EXAM_REGISTER_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: EXAM_REGISTER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error;
  }
};

// @desc    Book an exam (requires full fee payment)
// @route   POST /api/exams/:examId/book
export const bookExam = (examId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_BOOK_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/exams/${examId}/book`, {}, config);

    dispatch({
      type: EXAM_BOOK_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: EXAM_BOOK_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error;
  }
};

// @desc    Get exam card for a booked exam
// @route   GET /api/exams/:examId/exam-card
export const getExamCard = (examId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_CARD_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/exams/${examId}/exam-card`, config);

    dispatch({
      type: EXAM_CARD_SUCCESS,
      payload: data.data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: EXAM_CARD_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error;
  }
};

// @desc    Get all booked exams for a student
// @route   GET /api/exams/my-bookings
export const getMyExamBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_BOOKINGS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/exams/my-bookings', config);

    dispatch({
      type: EXAM_BOOKINGS_SUCCESS,
      payload: data.data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: EXAM_BOOKINGS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// @desc    Get available exams for registration
// @route   GET /api/exams/available
export const getAvailableExams = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AVAILABLE_EXAMS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/exams/available', config);

    dispatch({
      type: AVAILABLE_EXAMS_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: AVAILABLE_EXAMS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error;
  }
};

// @desc    Check exam eligibility
// @route   GET /api/exams/check-eligibility
export const checkExamEligibility = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXAM_ELIGIBILITY_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/exams/check-eligibility', config);

    dispatch({
      type: EXAM_ELIGIBILITY_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: EXAM_ELIGIBILITY_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error;
  }
};

// @desc    Confirm exam booking (Admin only)
// @route   PUT /api/exams/bookings/:bookingId/confirm
export const confirmExamBooking = (bookingId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONFIRM_BOOKING_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/exams/bookings/${bookingId}/confirm`, {}, config);

    dispatch({
      type: CONFIRM_BOOKING_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: CONFIRM_BOOKING_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error;
  }
};

// @desc    Cancel exam booking
// @route   PUT /api/exams/bookings/:bookingId/cancel
export const cancelExamBooking = (bookingId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_BOOKING_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/exams/bookings/${bookingId}/cancel`, {}, config);

    dispatch({
      type: CANCEL_BOOKING_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: CANCEL_BOOKING_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error;
  }
};

// Export all actions as default for easier importing
export default {
  createExam,
  getAllExams,
  getExamDetails,
  updateExam,
  deleteExam,
  registerForExam,
  bookExam,
  getExamCard,
  getMyExamBookings,
  getAvailableExams,
  checkExamEligibility,
  confirmExamBooking,
  cancelExamBooking
};