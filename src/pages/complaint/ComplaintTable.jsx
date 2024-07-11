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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useComplaintModels } from '../../hooks/complaint.api'; // Adjust the import path as needed

function ComplaintList({ searchText }) {
  const { data: complaints, error, isLoading } = useComplaintModels();
  const [rows, setRows] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'resolved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  useEffect(() => {
    if (complaints) {
      setRows(complaints.data);
    }
  }, [complaints]);

  useEffect(() => {
    if (complaints) {
      if (searchText === '') {
        setRows(complaints.data);
      } else {
        const filteredRows = complaints.data.filter(
          (row) =>
            (row.title && row.title.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.description && row.description.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.etat && row.etat.toLowerCase().includes(searchText.toLowerCase()))
        );
        setRows(filteredRows);
      }
    }
  }, [searchText, complaints]);

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
    console.log('Selected rows:', newSelectionModel);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200, editable: false },
    { field: 'description', headerName: 'Description', width: 400, editable: false },
    {
      field: 'etat',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FiberManualRecordIcon sx={{ color: getStatusColor(params.value), marginRight: 1 }} />
          {params.value}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: () => (
        <Box>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={(event) => {
              event.stopPropagation();
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
              // Your delete logic here
              console.log('Delete', params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

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
            Complaints
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

ComplaintList.propTypes = {
  searchText: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired
};

export default ComplaintList;
