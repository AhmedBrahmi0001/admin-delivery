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
import LoadingButton from '@mui/lab/LoadingButton';
import { useQueryClient } from '@tanstack/react-query';

const AddUserDialog = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState({
    errors: {},
    message: null
  });

  const createClientMutation = useCreateClientModel();
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', phone_number: '' });
  const [image, setImage] = useState(null);
  // const [errors, setErrors] = useState({});

  const handleChangeImage = (e) => {
    const { files } = e.target;
    console.log(files);
    setImage(files[0]);
  };
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setValidationErrors({
      errors: {},
      message: null
    });
  };

  // const validate = () => {
  //   let tempErrors = {};
  //   tempErrors.name = newUser.name ? '' : 'This field is required.';
  //   tempErrors.email = newUser.email ? '' : 'This field is required.';
  //   tempErrors.password = newUser.password ? '' : 'This field is required.';
  //   tempErrors.phone_number = newUser.phone_number ? '' : 'This field is required.';
  //   setErrors(tempErrors);
  //   return Object.values(tempErrors).every((x) => x === '');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({
      errors: null,
      message: null
    });
    try {
      const formData = new FormData();
      for (const key in newUser) {
        formData.append(key, newUser[key]);
      }
      if (image) {
        // formData.append('image', image, image.name); // Append image with its filename
      }
      await createClientMutation.mutateAsync(formData);
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
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Client</DialogTitle>
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
                helperText={validationErrors?.errors?.name}
                error={validationErrors?.errors?.name}
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
                helperText={validationErrors?.errors?.email}
                error={validationErrors?.errors?.email}
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
                helperText={validationErrors?.errors?.password}
                error={validationErrors?.errors?.password}
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
                helperText={validationErrors?.errors?.phone_number}
                error={validationErrors?.errors?.phone_number}
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
                {validationErrors?.errors?.image && <p>{validationErrors?.errors?.image}</p>}
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
        <LoadingButton type="submit" color="primary" variant="contained" onClick={handleSubmit} loading={createClientMutation?.isPending}>
          Add
        </LoadingButton>
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
