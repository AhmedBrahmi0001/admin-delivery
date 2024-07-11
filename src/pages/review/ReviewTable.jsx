import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useEvaluationModels } from '../../hooks/evaluation.api'; // Adjust the import path as needed

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'comment', headerName: 'Comment', width: 400, editable: false },
  { field: 'rating', headerName: 'Rating', width: 150, editable: false },

  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Box>
        <IconButton
          color="primary"
          aria-label="edit"
          onClick={(event) => {
            event.stopPropagation();
            // Your edit logic here
            // Your edit logic here
            console.log('Edit', params.row.id);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="delete"
          onClick={(event) => {
            event.stopPropagation();
            console.log('Delete', params.row.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    )
  }
];

function ReviewList({ searchText }) {
  const { data: evaluations, error, isLoading } = useEvaluationModels();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (evaluations) {
      setRows(evaluations.data);
    }
  }, [evaluations]);

  useEffect(() => {
    if (evaluations) {
      if (searchText === '') {
        setRows(evaluations.data);
      } else {
        const filteredRows = evaluations.data.filter(
          (row) =>
            (row.comment && row.comment.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.rating && row.rating.toLowerCase().includes(searchText.toLowerCase()))
        );
        setRows(filteredRows);
      }
    }
  }, [searchText, evaluations]);

  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  const handleSelectionModelChange = (newSelectionModel) => {
    // Implement selection logic if needed
    console.log('Selected rows:', newSelectionModel);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: 400, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant="h4" component="div">
            Reviews
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
    </Box>
  );
}

ReviewList.propTypes = {
  searchText: PropTypes.string.isRequired
};

export default ReviewList;
