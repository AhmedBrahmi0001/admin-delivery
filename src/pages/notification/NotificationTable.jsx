import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNotificationModels } from '../../hooks/notification.api'; // Adjust the import path as needed

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 200, editable: false },
  { field: 'description', headerName: 'Description', width: 250, editable: false },
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

function NotificationList({ searchText }) {
  const { data: notifications, error, isLoading } = useNotificationModels();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (notifications) {
      setRows(notifications.data);
    }
  }, [notifications]);

  useEffect(() => {
    if (notifications) {
      if (searchText === '') {
        setRows(notifications.data);
      } else {
        const filteredRows = notifications.data.filter(
          (row) =>
            (row.title && row.title.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.description && row.description.toLowerCase().includes(searchText.toLowerCase()))
        );
        setRows(filteredRows);
      }
    }
  }, [searchText, notifications]);

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
            Notifications
          </Typography>
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

NotificationList.propTypes = {
  searchText: PropTypes.string.isRequired
};

export default NotificationList;
