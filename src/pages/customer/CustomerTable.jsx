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
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';
import { useClientModels } from '../../hooks/client.api'; // Adjust the import path as needed
import { Card, Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function UserList({ searchText }) {
  const { data: clients, error, isLoading } = useClientModels();
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const navigate = useNavigate();
  const [status, setStatus] = React.useState('-1');
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    if (clients) {
      setRows(clients.data);
    }
  }, [clients]);

  useEffect(() => {
    if (clients) {
      if (searchText === '') {
        setRows(clients.data);
      } else {
        const filteredRows = clients.data.filter(
          (row) =>
            (row?.user?.name && row?.user?.name.toLowerCase().includes(searchText.toLowerCase())) ||
            (row?.user?.email && row?.user?.email.toLowerCase().includes(searchText.toLowerCase())) ||
            (row?.user?.phone_number && row?.user?.phone_number.toLowerCase().includes(searchText.toLowerCase()))
        );
        setRows(filteredRows);
      }
      if (status !== '') {
        const filteredRows = clients.data.filter((row) => row?.is_active == parseInt(status));
        setRows(filteredRows);
      }
    }
  }, [searchText, clients, status]);

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

  const handleRowClick = (param, event) => {
    // Check if the checkbox was clicked
    if (event.target.closest('.MuiDataGrid-checkboxInput')) {
      return;
    }
    navigate(`/customer/details/${param.id}`);
  };

  const handleSelectionModelChange = (newSelectionModel) => {
    console.log('Selected rows:', newSelectionModel);
  };

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddUser = (newUser) => {
    const newUserWithId = { ...newUser, id: rows.length + 1, signedUp: new Date().toLocaleDateString() };
    setRows([...rows, newUserWithId]);
  };

  const handleEditClick = (user) => {
    setCurrentEditUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditUser = (updatedUser) => {
    setRows(rows.map((row) => (row.id === updatedUser.id ? updatedUser : row)));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return 'green';
      case 0:
        return 'red';
      default:
        return 'gray';
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: false,
      renderCell: (params) => <>{params?.row?.user?.name}</>
    },
    { field: 'email', headerName: 'Email', width: 250, editable: false, renderCell: (params) => <>{params?.row?.user?.email}</> },
    {
      field: 'phone_number',
      headerName: 'Phone',
      width: 150,
      editable: false,
      renderCell: (params) => <>{params?.row?.user?.phone_number}</>
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => <img src={params?.row?.user?.image} alt="Driver" style={{ width: '100px', height: 'auto' }} />
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FiberManualRecordIcon sx={{ color: getStatusColor(params.row?.is_active), marginRight: 1 }} />
        </Box>
      )
    },

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
              handleEditClick(params.row);
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

  return (
    <>
      <Card sx={{ p: 3, mb: 3, boxShadow: 3, borderRadius: 2 }}>
        <Grid item xs={12} md={6}>
          <Select value={status} onChange={handleStatusChange} displayEmpty fullWidth variant="outlined" sx={{ mb: 2, boxShadow: 1 }}>
            <MenuItem value="">
              <em>Status</em>
            </MenuItem>
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </Select>
        </Grid>
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
                Customers
              </Typography>
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenAddDialog}>
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
              onRowClick={handleRowClick}
              onSelectionModelChange={handleSelectionModelChange}
            />
          </Box>
          <AddUserDialog open={openAddDialog} handleClose={handleCloseAddDialog} handleAddUser={handleAddUser} />
          {currentEditUser && (
            <EditUserDialog
              open={openEditDialog}
              handleClose={handleCloseEditDialog}
              user={currentEditUser}
              handleEditUser={handleEditUser}
            />
          )}
        </Box>
      </Card>
    </>
  );
}

UserList.propTypes = {
  searchText: PropTypes.string.isRequired
};

export default UserList;
