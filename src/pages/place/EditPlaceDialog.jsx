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
import { useQueryClient } from '@tanstack/react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import { useGetPlaceModel, useUpdatePlaceModel } from 'hooks/places.api';

const EditPlaceDialog = ({ open, handleClose, placeId }) => {
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState({
    errors: {},
    message: null
  });
  const { data: placeData, isSuccess: placeDataSuccess } = useGetPlaceModel(placeId);
  const [newPlace, setNewPlace] = useState({
    name: '',
    description: ''
  });
  // const [formErrors, setFormErrors] = useState({});
  const editPlaceMutation = useUpdatePlaceModel();

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
      await editPlaceMutation.mutateAsync({
        placeId: placeId,
        values: formData
      });
      queryClient.invalidateQueries();
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorsObject = error.response.data;
        setValidationErrors(errorsObject);
        console.error('errorsObject: ', errorsObject);
        // setFormErrors(errorsObject);
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
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent>
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
                helperText={validationErrors?.errors?.name}
                error={validationErrors?.errors?.name}
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
                helperText={validationErrors?.errors?.description}
                error={validationErrors?.errors?.description}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <LoadingButton type="submit" color="primary" variant="contained" loading={editPlaceMutation?.isPending}>
            Save
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

EditPlaceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  placeId: PropTypes.string.isRequired
};

export default EditPlaceDialog;
