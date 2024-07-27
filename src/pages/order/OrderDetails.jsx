import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { NumericFormat } from 'react-number-format';
import { styled } from '@mui/system';
import { useGetOrderModel } from 'hooks/order.api';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1)
}));

function OrderDetailsPage({ orderId }) {
  const { data: orders, error, isLoading } = useGetOrderModel(orderId);

  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">ID</Typography>
            <Typography variant="body1">{orders?.data?.id}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Order Code</Typography>
            <Typography variant="body1">{orders?.data?.code}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Delivered Date</Typography>
            <Typography variant="body1">{orders?.data?.delivered_date}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Pickup Address</Typography>
            <Typography variant="body1">{orders?.data?.pickup_address}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Deliver Address</Typography>
            <Typography variant="body1">{orders?.data?.deliver_address}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Quantity</Typography>
            <Typography variant="body1">{orders?.data?.quantity}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body1">{orders?.data?.description}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Price</Typography>
            <Typography variant="body1">
              <NumericFormat value={orders?.data?.price} displayType="text" thousandSeparator prefix="$" />
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Client Name</Typography>
            <Typography variant="body1">{orders?.data?.client?.user?.name}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Driver Name</Typography>
            <Typography variant="body1">{orders?.data?.driver?.name}</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

// Add prop types validation
OrderDetailsPage.propTypes = {
  orderId: PropTypes.string.isRequired // orderId should be a string and is required
};

export default OrderDetailsPage;
