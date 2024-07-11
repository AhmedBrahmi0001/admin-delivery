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
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
//import ImageIcon from '@mui/icons-material/Image';
import { useGetDriverModel, useUpdateDriverModel } from '../../hooks/driver.api';
import { usePlaceModels } from 'hooks/places.api';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const EditDriverDialog = ({ open, handleClose, driverId }) => {
  const { data: driverData, isSuccess: driverDataSuccess } = useGetDriverModel(driverId);
  const { data: places, error, isLoading } = usePlaceModels();
  const [newDriver, setNewDriver] = useState({
    driver_name: '',
    price: '',
    name: '',
    email: '',
    phone_number: '',
    place_id: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null);
  const [driverImage, setDriverImage] = useState(null);
  const editDriverMutation = useUpdateDriverModel();

  const handleChangeImage = (e) => {
    const { files } = e.target;
    console.log(files);
    setImage(files[0]);
  };

  const handleChangeDriverImage = (e) => {
    const { files } = e.target;
    console.log(files);
    setDriverImage(files[0]);
  };

  const handleChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in newDriver) {
        formData.append(key, newDriver[key]);
      }
      if (image) {
        // formData.append('image', image, image.name); // Append image with its filename
      }
      if (driverImage) {
        // formData.append('driver_image', driverImage, driverImage.name); // Append image with its filename
      }
      formData.delete('image');
      formData.delete('driver_image');
      await editDriverMutation.mutateAsync({
        driverId: driverId,
        values: formData
      });
      // handleEditDriver(newDriver);
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
    if (driverData && driverDataSuccess) {
      setNewDriver({
        ...driverData,
        driver_name: driverData?.name,
        name: driverData?.user?.name,
        email: driverData?.user?.email,
        phone_number: driverData?.user?.phone_number
      });
    }
  }, [driverData]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Driver</DialogTitle>
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
                  <Grid item xs={12}>
                    <input id="image-upload" type="file" onChange={handleChangeImage} style={{ display: 'none' }} />
                    <label htmlFor="image-upload">
                      <Button variant="contained" component="span" fullWidth>
                        Upload User Image
                      </Button>
                    </label>
                    {image && <p>{image.name}</p>}
                  </Grid>
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
            <Grid item xs={12} mt={2} mb={2}>
              <Grid item xs={12}>
                <input id="image-upload2" type="file" onChange={handleChangeDriverImage} style={{ display: 'none' }} />
                <label htmlFor="image-upload2">
                  <Button variant="contained" component="span" fullWidth>
                    Upload Driver Image
                  </Button>
                </label>
                {driverImage && <p>{driverImage.name}</p>}
              </Grid>
            </Grid>
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

EditDriverDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  driverId: PropTypes.func.isRequired
};

export default EditDriverDialog;
