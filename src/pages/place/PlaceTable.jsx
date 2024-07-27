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
import AddPlaceDialog from './AddPlaceDialog';
import EditPlaceDialog from './EditPlaceDialog';
import { useDeletePlaceModel, usePlaceModels } from 'hooks/places.api';
import { useQueryClient } from '@tanstack/react-query';

function PlaceList({ searchText }) {
  const { data: places, error, isLoading } = usePlaceModels();
  const queryClient = useQueryClient();
  const deleteOrderMutation = useDeletePlaceModel();

  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentEditPlaceId, setCurrentEditPlaceId] = useState(null);

  useEffect(() => {
    if (places) {
      if (searchText === '') {
        setRows(places?.data);
      } else {
        const filteredRows = places?.data.filter(
          (row) =>
            (row.name && row.name.toLowerCase().includes(searchText.toLowerCase())) ||
            (row.description && row.description.toLowerCase().includes(searchText.toLowerCase()))
        );
        setRows(filteredRows);
      }
    }
  }, [searchText, places]);

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddPlace = (newPlace) => {
    const newPlaceWithId = { ...newPlace, id: rows.length + 1 };
    setRows([...rows, newPlaceWithId]);
  };

  const handleEditClick = (place) => {
    setCurrentEditPlaceId(place);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditPlace = (updatedPlace) => {
    setRows(rows.map((row) => (row.id === updatedPlace.id ? updatedPlace : row)));
  };

  const handleDeleteClick = async (orderId) => {
    try {
      await deleteOrderMutation.mutateAsync(orderId);
      queryClient.invalidateQueries();
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200, editable: false },
    { field: 'description', headerName: 'Description', width: 300, editable: false },
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
            Places
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenAddDialog}>
            Add
          </Button>
        </Box>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection disableSelectionOnClick />
      </Box>
      <AddPlaceDialog open={openAddDialog} handleClose={handleCloseAddDialog} handleAddPlace={handleAddPlace} />
      {console.log(currentEditPlaceId)}
      {currentEditPlaceId && (
        <EditPlaceDialog
          open={openEditDialog}
          handleClose={handleCloseEditDialog}
          placeId={currentEditPlaceId}
          handleEditPlace={handleEditPlace}
        />
      )}
    </Box>
  );
}

PlaceList.propTypes = {
  searchText: PropTypes.string.isRequired
};

export default PlaceList;
