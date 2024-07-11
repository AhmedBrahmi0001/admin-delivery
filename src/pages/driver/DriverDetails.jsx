// src/components/OrderDetailsPage.js

import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { NumericFormat } from 'react-number-format';
import { styled } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1)
}));

function DriverDetailsPage() {
  // Static driver details

  const driver = {
    id: 1,
    customer: 'John Doe',
    date: '2023-06-15',
    status: 1,
    total: 1500,
    items: [
      { id: 1, name: 'Item 1', quantity: 2, price: 500 },
      { id: 2, name: 'Item 2', quantity: 1, price: 500 }
    ]
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Driver Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Driver ID</Typography>
            <Typography variant="body1">{driver.id}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Driver</Typography>
            <Typography variant="body1">{driver.customer}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Date</Typography>
            <Typography variant="body1">{driver.date}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Status</Typography>
            <Typography variant="body1">{driver.status === 1 ? 'Completed' : driver.status === 0 ? 'Pending' : 'Cancelled'}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6">Total Amount</Typography>
            <Typography variant="body1">
              <NumericFormat value={driver.total} displayType="text" thousandSeparator prefix="$" />
            </Typography>
          </Item>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Items
        </Typography>
        <Divider />
        {driver.items.map((item) => (
          <Box key={item.id} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Item>
                  <Typography variant="body1">{item.name}</Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <Item>
                  <Typography variant="body1">Quantity: {item.quantity}</Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <Item>
                  <Typography variant="body1">
                    <NumericFormat value={item.price} displayType="text" thousandSeparator prefix="$" /> each
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Item>
                  <Typography variant="body1">
                    Total: <NumericFormat value={item.price * item.quantity} displayType="text" thousandSeparator prefix="$" />
                  </Typography>
                </Item>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default DriverDetailsPage;
