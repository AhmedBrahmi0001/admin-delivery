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
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const AddUserDialog = ({ open, handleClose, handleAddUser }) => {
  const [newUser, setNewUser] = useState({ name: '', email: '', location: '', phone: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = newUser.name ? '' : 'This field is required.';
    tempErrors.email = newUser.email ? '' : 'This field is required.';
    tempErrors.location = newUser.location ? '' : 'This field is required.';
    tempErrors.phone = newUser.phone ? '' : 'This field is required.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = () => {
    if (validate()) {
      handleAddUser(newUser);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate>
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
                value={newUser.name}
                onChange={handleChange}
                helperText={errors.name}
                error={!!errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={newUser.email}
                onChange={handleChange}
                helperText={errors.email}
                error={!!errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="location"
                label="Location"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.location}
                onChange={handleChange}
                helperText={errors.location}
                error={!!errors.location}
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
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.phone}
                onChange={handleChange}
                helperText={errors.phone}
                error={!!errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
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
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddUser: PropTypes.func.isRequired
};

export default AddUserDialog;
