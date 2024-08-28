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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
//import ImageIcon from '@mui/icons-material/Image';
import { useCreateDriverModel } from '../../hooks/driver.api';
import { usePlaceModels } from 'hooks/places.api';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axiosClient from 'axiosClient';

const AddDriverDialog = ({ open, handleClose, handleAddDriver }) => {
  const { data: places, error, isLoading } = usePlaceModels();
  const [newDriver, setNewDriver] = useState({
    driver_name: '',
    price: '',
    name: '',
    email: '',
    password: '',
    phone_number: '',
    place_id: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null);
  const [driverImage, setDriverImage] = useState(null);
  const createDriverMutation = useCreateDriverModel();

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleChangeDriverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDriverImage(file);
    }
  };

  const handleChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append non-file data
      for (const key in newDriver) {
        formData.append(key, newDriver[key]);
      }

      // Append files only if they exist
      if (image) {
        formData.append('image', image);
      }
      if (driverImage) {
        formData.append('driver_image', driverImage);
      }

      // Debugging: Log formData entries
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }
      const response = await axiosClient.post('/drivers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      // Replace with your API call
      // await createDriverMutation.mutateAsync(formData);
      handleAddDriver(newDriver);
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
      <DialogTitle>Add New Driver</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newDriver.name}
                    onChange={handleChange}
                    helperText={formErrors?.errors?.name}
                    error={!!formErrors?.errors?.name}
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
                    value={newDriver.email}
                    onChange={handleChange}
                    helperText={formErrors?.errors?.email}
                    error={!!formErrors?.errors?.email}
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
                    value={newDriver.password}
                    onChange={handleChange}
                    helperText={formErrors?.errors?.password}
                    error={!!formErrors?.errors?.password}
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
                    value={newDriver.phone_number}
                    onChange={handleChange}
                    helperText={formErrors?.errors?.phone_number}
                    error={!!formErrors?.errors?.phone_number}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} mt={2} mb={2}>
                  <input id="image-upload" type="file" accept="image/*" onChange={handleChangeImage} style={{ display: 'none' }} />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span" fullWidth>
                      Upload User Image
                    </Button>
                  </label>
                  {image && <p>{image.name}</p>}
                </Grid>
                <Grid item xs={12} mt={2} mb={2}>
                  <input id="image-upload2" type="file" accept="image/*" onChange={handleChangeDriverImage} style={{ display: 'none' }} />
                  <label htmlFor="image-upload2">
                    <Button variant="contained" component="span" fullWidth>
                      Upload Driver Image
                    </Button>
                  </label>
                  {driverImage && <p>{driverImage.name}</p>}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="driver_name"
                  label="Driver Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newDriver.driver_name}
                  onChange={handleChange}
                  helperText={formErrors?.errors?.driver_name}
                  error={!!formErrors?.errors?.driver_name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <TextField
                margin="dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                value={newDriver.price}
                onChange={handleChange}
                helperText={formErrors?.errors?.price}
                error={!!formErrors?.errors?.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" aria-label="Price Icon">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs={12} mt={2} mb={2}>
              <Grid item xs={12}>
                <input id="image-upload2" type="file" onChange={handleChangeDriverImage} style={{ display: 'none' }} />
                <label htmlFor="image-upload2">
                  <Button variant="contained" component="span" fullWidth>
                    Upload Driver Image
                  </Button>
                </label>
                {driverImage && <p>{driverImage.name}</p>}
              </Grid>
            </Grid> */}
            <Grid item xs={12} mt={2} mb={2}>
              <FormControl fullWidth>
                <InputLabel id="place-label">Place</InputLabel>
                <Select labelId="place-label" id="place" name="place_id" value={newDriver.place_id} onChange={handleChange} label="Place">
                  {isLoading ? (
                    <MenuItem value="">
                      <em>Loading...</em>
                    </MenuItem>
                  ) : (
                    places?.data?.map((place) => (
                      <MenuItem key={place.id} value={place.id}>
                        {place.name}
                      </MenuItem>
                    ))
                  )}
                  {error && (
                    <MenuItem value="">
                      <em>Error loading places</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
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

AddDriverDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddDriver: PropTypes.func.isRequired
};

export default AddDriverDialog;
