export const MAX_FILE_SIZE_MB = 10; // Maximum file size allowed in megabytes
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed file types
export const MAX_FILES_LIMIT = 5; // Maximum number of files allowed in a single upload


export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

export const ERROR_MESSAGES = {
  FILE_SIZE_EXCEEDED: `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`,
  INVALID_FILE_TYPE: `Invalid file type. Allowed types are: ${ALLOWED_FILE_TYPES.join(', ')}.`,
  MAX_FILES_EXCEEDED: `Maximum of ${MAX_FILES_LIMIT} files allowed in a single upload.`,
};


