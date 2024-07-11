import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditUserDialog = ({ open, handleClose, user, handleEditUser }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleEditUser(editedUser);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
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
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          variant="standard"
          value={editedUser.location}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          variant="standard"
          value={editedUser.phone}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
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
