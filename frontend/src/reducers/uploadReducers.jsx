import {
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
  } from '../constants/uploadConstants'; 

  
export const uploadFileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPLOAD_FILE_REQUEST:
        return { loading: true };
      case UPLOAD_FILE_SUCCESS:
        return { loading: false, success: true, uploadedFile: action.payload };
      case UPLOAD_FILE_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  