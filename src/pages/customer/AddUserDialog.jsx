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
import { useCreateClientModel } from 'hooks/client.api';

const AddUserDialog = ({ open, handleClose, handleAddUser }) => {
  const createClientMutation = useCreateClientModel();
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', phone_number: '' });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChangeImage = (e) => {
    const { files } = e.target;
    console.log(files);
    setImage(files[0]);
  };
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = newUser.name ? '' : 'This field is required.';
    tempErrors.email = newUser.email ? '' : 'This field is required.';
    tempErrors.password = newUser.password ? '' : 'This field is required.';
    tempErrors.phone_number = newUser.phone_number ? '' : 'This field is required.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formData = new FormData();
        for (const key in newUser) {
          formData.append(key, newUser[key]);
        }
        if (image) {
          // formData.append('image', image, image.name); // Append image with its filename
        }
        await createClientMutation.mutateAsync(formData);
        handleAddUser(newUser);
        handleClose();
      } catch (error) {
        if (error.response && error.response.data) {
          const errorsObject = error.response.data;
          console.error('errorsObject: ', errorsObject);
        } else {
          console.error('Error occurred without response data:', error);
        }
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
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
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={newUser.password}
                onChange={handleChange}
                helperText={errors.password}
                error={!!errors.password}
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
                name="phone_number"
                label="Phone"
                type="tel"
                fullWidth
                variant="outlined"
                value={newUser.phone_number}
                onChange={handleChange}
                helperText={errors.phone_number}
                error={!!errors.phone_number}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <input id="image-upload" type="file" onChange={handleChangeImage} style={{ display: 'none' }} />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span" fullWidth>
                    Upload Image
                  </Button>
                </label>
                {image && <p>{image.name}</p>}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button type="submit" color="primary" variant="contained" onClick={handleSubmit}>
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
