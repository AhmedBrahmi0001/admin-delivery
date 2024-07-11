import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useGetPlaceModel, useUpdatePlaceModel } from 'hooks/places.api';

const EditPlaceDialog = ({ open, handleClose, placeId }) => {
  const { data: placeData, isSuccess: placeDataSuccess } = useGetPlaceModel(placeId);
  const [newPlace, setNewPlace] = useState({
    name: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const editPlaceMutation = useUpdatePlaceModel();

  const handleChange = (e) => {
    setNewPlace({ ...newPlace, [e.target.name]: e.target.value });
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in newDriver) {
        formData.append(key, newDriver[key]);
      }
      await editPlaceMutation.mutateAsync({
        placeId: placeId,
        values: newPlace
      });
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorsObject = error.response.data;
        console.error('errorsObject: ', errorsObject);
        setFormErrors(errorsObject);
      } else {
        console.error('Error occurred without response data:', error);
      }
    }
  };

  useEffect(() => {
    if (placeData && placeDataSuccess) {
      setNewPlace({
        name: placeData?.name,
        description: placeData?.description
      });
    }
  }, [placeData]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Place</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newPlace.name}
                onChange={handleChange}
                helperText={formErrors?.errors?.name}
                error={!!formErrors?.errors?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={newPlace.description}
                onChange={handleChange}
                helperText={formErrors?.errors?.description}
                error={!!formErrors?.errors?.description}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditPlaceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  placeId: PropTypes.string.isRequired
};

export default EditPlaceDialog;
