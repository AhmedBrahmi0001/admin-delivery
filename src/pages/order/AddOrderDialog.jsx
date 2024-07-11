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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Typography from '@mui/material/Typography';
import { useClientModels } from 'hooks/client.api';
import { useDriverModels } from 'hooks/driver.api';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useCreateOrderModel } from 'hooks/order.api';

const AddOrderDialog = ({ open, handleClose, handleAddOrder }) => {
  const { data: drivers, error: errorDriver, isLoading: isLoadingDriver } = useDriverModels();
  const { data: clients, error: errorClient, isLoading: isLoadingClient } = useClientModels();

  const [newOrder, setNewOrder] = useState({
    code: '',
    delivered_date: '',
    pickup_address: '',
    deliver_address: '',
    quantity: '',
    description: '',
    price: '',
    etat: '',
    client_id: '',
    driver_id: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null);
  const [orderImage, setOrderImage] = useState(null);
  const createOrderMutation = useCreateOrderModel();

  if (isLoadingDriver || isLoadingClient) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Loading...</Typography>
      </Box>
    );
  }

  if (errorClient || errorDriver) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="error">
          Error: {errorClient?.message || errorDriver?.message}
        </Typography>
      </Box>
    );
  }

  const handleChangeImage = (e) => {
    const { files } = e.target;
    console.log(files);
    setImage(files[0]);
  };

  const handleChangeOrderImage = (e) => {
    const { files } = e.target;
    console.log(files);
    setOrderImage(files[0]);
  };

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in newOrder) {
        formData.append(key, newOrder[key]);
      }
      if (image) {
        // formData.append('image', image, image.name); // Append image with its filename
      }
      if (orderImage) {
        // formData.append('order_image', orderImage, orderImage.name); // Append image with its filename
      }
      await createOrderMutation.mutateAsync(formData);
      handleAddOrder(newOrder);
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
      <DialogTitle>Add New Order</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="code"
                label="Code"
                type="text"
                fullWidth
                variant="outlined"
                value={newOrder.code}
                onChange={handleChange}
                helperText={formErrors?.errors?.code}
                error={!!formErrors?.errors?.code}
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
                name="delivered_date"
                label="Delivered Date"
                type="date"
                fullWidth
                variant="outlined"
                value={newOrder.delivered_date}
                onChange={handleChange}
                helperText={formErrors?.errors?.delivered_date}
                error={!!formErrors?.errors?.delivered_date}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="pickup_address"
                label="Pickup Address"
                type="text"
                fullWidth
                variant="outlined"
                value={newOrder.pickup_address}
                onChange={handleChange}
                helperText={formErrors?.errors?.pickup_address}
                error={!!formErrors?.errors?.pickup_address}
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
                name="deliver_address"
                label="Deliver Address"
                type="text"
                fullWidth
                variant="outlined"
                value={newOrder.deliver_address}
                onChange={handleChange}
                helperText={formErrors?.errors?.deliver_address}
                error={!!formErrors?.errors?.deliver_address}
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
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth
                variant="outlined"
                value={newOrder.quantity}
                onChange={handleChange}
                helperText={formErrors?.errors?.quantity}
                error={!!formErrors?.errors?.quantity}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ProductionQuantityLimitsIcon />
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
                value={newOrder.description}
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
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                value={newOrder.price}
                onChange={handleChange}
                helperText={formErrors?.errors?.price}
                error={!!formErrors?.errors?.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="etat"
                label="State"
                type="text"
                fullWidth
                variant="outlined"
                value={newOrder.etat}
                onChange={handleChange}
                helperText={formErrors?.errors?.etat}
                error={!!formErrors?.errors?.etat}
              />
            </Grid>
            <Grid item xs={12} mt={2} mb={2}>
              <FormControl fullWidth>
                <InputLabel id="client-label">Client</InputLabel>
                <Select
                  labelId="client-label"
                  id="client"
                  name="client_id"
                  value={newOrder.client_id}
                  onChange={handleChange}
                  label="Client"
                >
                  {clients?.data?.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.user.name}
                    </MenuItem>
                  ))}
                  {errorClient && (
                    <MenuItem value="">
                      <em>Error loading clients</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={2} mb={2}>
              <FormControl fullWidth>
                <InputLabel id="driver-label">Driver</InputLabel>
                <Select
                  labelId="driver-label"
                  id="driver"
                  name="driver_id"
                  value={newOrder.driver_id}
                  onChange={handleChange}
                  label="Driver"
                >
                  {drivers?.data?.map((driver) => (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </MenuItem>
                  ))}
                  {errorDriver && (
                    <MenuItem value="">
                      <em>Error loading drivers</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={2} mb={2}>
              <input id="image-upload" type="file" onChange={handleChangeImage} style={{ display: 'none' }} />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span" fullWidth>
                  Upload User Image
                </Button>
              </label>
              {image && <p>{image.name}</p>}
            </Grid>
            <Grid item xs={12} mt={2} mb={2}>
              <input id="image-upload2" type="file" onChange={handleChangeOrderImage} style={{ display: 'none' }} />
              <label htmlFor="image-upload2">
                <Button variant="contained" component="span" fullWidth>
                  Upload Order Image
                </Button>
              </label>
              {orderImage && <p>{orderImage.name}</p>}
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

AddOrderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddOrder: PropTypes.func.isRequired
};

export default AddOrderDialog;
