// uploadActions.js

import axios from 'axios';
import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
} from '../constants/uploadConstants'; 

export const uploadFile = (file) => async (dispatch) => {
    try {
      dispatch({ type: UPLOAD_FILE_REQUEST });
  
      // Make an API call to upload the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'f3gqwyzn');
      formData.append('cloud_name', 'dqquyjsap');
  
      const response = await axios.post('https://api.cloudinary.com/v1_1/dqquyjsap/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Dispatch success action with the uploaded file information
      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: response.data.secure_url, // Access secure_url from the response data
      });
  
      // Return the secure_url
      return response.data.secure_url;
    } catch (error) {
      // Dispatch failure action with the error message
      dispatch({
        type: UPLOAD_FILE_FAILURE,
        payload: error,
      });
  
      // Return null in case of failure
      return null;
    }
  };
