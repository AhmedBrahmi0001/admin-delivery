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
    setImage(files[0]);
  };

  const handleChangeOrderImage = (e) => {
    const { files } = e.target;
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
        formData.append('image', image, image.name);
      }
      if (orderImage) {
        formData.append('order_image', orderImage, orderImage.name);
      }
      await createOrderMutation.mutateAsync(formData);
      handleAddOrder(newOrder);
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorsObject = error.response.data;
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
            {/* Other form fields */}
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
                      {client.user ? client.user.name : 'Unknown Client'}
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
                      {driver.name || 'Unknown Driver'}
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
            {/* Other form fields */}
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
