import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useCreatePlaceModel } from 'hooks/places.api';
import DescriptionIcon from '@mui/icons-material/Description';

const AddPlaceDialog = ({ open, handleClose, handleAddPlace }) => {
  const createPlaceMutation = useCreatePlaceModel();
  const [newPlace, setNewPlace] = useState({ name: '', description: '' });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setNewPlace({ ...newPlace, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in newPlace) {
        formData.append(key, newPlace[key]);
      }
      await createPlaceMutation.mutateAsync(formData);
      handleAddPlace(newPlace);
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Place</DialogTitle>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  )
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={createPlaceMutation?.isPending}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddPlaceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddPlace: PropTypes.func.isRequired
};

export default AddPlaceDialog;
