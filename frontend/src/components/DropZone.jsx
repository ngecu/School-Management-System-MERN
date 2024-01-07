import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone() {

    const [selectedImages, setSelectedImages] = useState([]);
    // Add this
    const [uploadStatus, setUploadStatus] = useState("");
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach((file) => {
          setSelectedImages((prevState) => [...prevState, file]);
        });
      }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
      } = useDropzone({ onDrop });

      return (
        <div className='drop-zone-cotainer'>
          <div className='dropzone' {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop file(s) here ...</p>
            ) : (
              <p>Drag and drop file(s) here, or click to select files</p>
            )}
          </div>

          <div className='images'>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
          ))}
      </div>

        </div>
      );
}

export default MyDropzone