/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import { useState } from 'react';
import { Box } from '@mui/material';

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

// eslint-disable-next-line no-unused-vars
function CsvDropZone({ setJsonData }) {

    const [file, setFile] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'text/*': ['.csv'],
        },
        onDrop: (acceptedFiles) => {
            // console.log(acceptedFiles[0])

            setFile(acceptedFiles[0])

            // Parse CSV to JSON and set the data
            parseCsvToJson(acceptedFiles[0], setJsonData);
        }
    });

    return (
        <Box display={"flex"} flexDirection={"column"} >
            <Box {...getRootProps({ className: 'dropzone' })} border={1} borderRadius={"10px"} p={3}>
                <input {...getInputProps()} />
                <Box sx={{display:"flex", justifyContent:"center"}}>Drag 'n' drop some files here, or click to select files</Box>
            </Box>

            {file !== null && (
                <Box pl={"20px"} mt={"10px"}>{file.name}</Box>
            )}
        </Box>
    );
}

export default CsvDropZone;


// Function to parse CSV to JSON
const parseCsvToJson = (file, setJsonData) => {
    Papa.parse(file, {
        complete: (result) => {
            // console.log('Parsed CSV Data:', result.data);
            setJsonData(result.data); // Update csvData directly here
        },
        header: true,  // Automatically use the first row as keys for JSON properties
        skipEmptyLines: true, // Skip empty lines in CSV
    });
};
