/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

// eslint-disable-next-line no-unused-vars
function ImageDropZoneBase64({ fileBase64, setFileBase64 }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = (e) => {
        const result = e.target.result;
        setFileBase64(result);
      };
    }
  });

  const ThumbsBase64 = () => {
    const list = fileBase64.split(',');
    return (
      <div style={thumb} key={list[0]}>
        <div style={thumbInner}>
          <img
            src={fileBase64}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(fileBase64);
            }}
          />
        </div>
      </div>
    );
  };

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return URL.revokeObjectURL(fileBase64);
    }, [fileBase64]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {fileBase64 !== '' && <aside style={thumbsContainer}>{<ThumbsBase64 />}</aside>}
    </section>
  );
}

export default ImageDropZoneBase64;
