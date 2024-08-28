import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateClientModel } from 'hooks/client.api';
import Box from '@mui/material/Box';

const EditUserDialog = ({ open, handleClose, user }) => {
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState({
    errors: {},
    message: null
  });

  const updateClientMutation = useUpdateClientModel();
  const [editedUser, setEditedUser] = useState({ ...user?.user });
  const [clientData, setClientData] = useState({ ...user });

  useEffect(() => {
    setEditedUser({ ...user?.user });
    setClientData({ ...user });
  }, [user]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    setValidationErrors({
      errors: {},
      message: null
    });
  };

  // const handleSubmit = () => {
  //   handleEditUser(editedUser);
  //   handleClose();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({
      errors: null,
      message: null
    });
    try {
      const formData = new FormData();
      for (const key in editedUser) {
        formData.append(key, editedUser[key]);
      }

      await updateClientMutation.mutateAsync({
        clientId: clientData?.id,
        values: formData
      });
      queryClient.invalidateQueries();
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorsObject = error.response.data;
        setValidationErrors(errorsObject);
        console.error('errorsObject: ', errorsObject);
      } else {
        console.error('Error occurred without response data:', error);
      }
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Client</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedUser.name}
            helperText={validationErrors?.errors?.name}
            error={validationErrors?.errors?.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={editedUser.email}
            helperText={validationErrors?.errors?.email}
            error={validationErrors?.errors?.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            value={editedUser.phone_number}
            helperText={validationErrors?.errors?.phone_number}
            error={validationErrors?.errors?.phone_number}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <LoadingButton color="primary" type="submit" loading={updateClientMutation?.isPending}>
            Save
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleEditUser: PropTypes.func.isRequired
};

export default EditUserDialog;
