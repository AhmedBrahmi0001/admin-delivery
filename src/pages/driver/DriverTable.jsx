import React, { useState, useEffect } from 'react';
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
import AddDriverDialog from './AddDriverDialog';
import EditDriverDialog from './EditDriverDialog';
import { useDeleteDriverModel, useDriverModels } from '../../hooks/driver.api';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useQueryClient } from '@tanstack/react-query';

function DriverList({ searchText, status }) {
  const queryClient = useQueryClient();
  const { data: drivers, error, isLoading } = useDriverModels();
  const deleteDriverMutation = useDeleteDriverModel();
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentEditDriverId, setCurrentEditDriverId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (drivers) {
      setRows(drivers.data);
    }
  }, [drivers]);

  useEffect(() => {
    if (drivers) {
      if (searchText === '') {
        setRows(drivers.data);
      } else {
        const filteredRows = drivers.data.filter((row) => row.name && row.name.toLowerCase().includes(searchText.toLowerCase()));
        setRows(filteredRows);
      }
      if (status !== '') {
        const filteredRows = drivers.data.filter((row) => row?.is_active == parseInt(status));
        setRows(filteredRows);
      }
    }
  }, [searchText, drivers, status]);

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
    if (event.target.closest('.MuiDataGrid-checkboxInput')) {
      return;
    }
    navigate(`/driver/details/${param.id}`);
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

  const handleAddDriver = (newDriver) => {
    const newDriverWithId = { ...newDriver, id: rows.length + 1 };
    setRows([...rows, newDriverWithId]);
  };

  const handleEditClick = (driverId) => {
    setCurrentEditDriverId(driverId);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteClick = async (driverId) => {
    try {
      await deleteDriverMutation.mutateAsync(driverId);
      queryClient.invalidateQueries();
    } catch (error) {
      console.error('Failed to delete driver:', error);
    }
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
    { field: 'name', headerName: 'Name', width: 200, editable: false },
    { field: 'price', headerName: 'Price', width: 150, editable: false },
    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => <img src={params.value} alt="Driver" style={{ width: '100px', height: 'auto' }} />
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
              handleEditClick(params.row?.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteClick(params.row?.id);
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
            Drivers
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
      <AddDriverDialog open={openAddDialog} handleClose={handleCloseAddDialog} handleAddDriver={handleAddDriver} />
      {currentEditDriverId && <EditDriverDialog open={openEditDialog} handleClose={handleCloseEditDialog} driverId={currentEditDriverId} />}
    </Box>
  );
}

DriverList.propTypes = {
  searchText: PropTypes.string.isRequired
};

export default DriverList;
