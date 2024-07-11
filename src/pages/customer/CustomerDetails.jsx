import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { NumericFormat } from 'react-number-format';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

function CustomerDetails() {
  const customer = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    location: 'New York, NY, USA',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '2023-06-15',
    status: 1,
    total: 1500,
    items: [
      { id: 1, name: 'Item 1', quantity: 2, price: 500 },
      { id: 2, name: 'Item 2', quantity: 1, price: 500 },
      { id: 3, name: 'Item 3', quantity: 1, price: 500 }
    ]
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Customer Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Box display="flex" justifyContent="center">
            <Avatar alt={customer.name} src={customer.avatar} sx={{ width: 120, height: 120, marginRight: 10 }} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Item>
            <Typography variant="h6">Customer ID</Typography>
            <Typography variant="body1">{customer.id}</Typography>
          </Item>
          <Item>
            <Typography variant="h6">Name</Typography>
            <Typography variant="body1">{customer.name}</Typography>
          </Item>
          <Item>
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1">
              <EmailIcon sx={{ fontSize: 18, marginRight: 1, verticalAlign: 'middle' }} />
              {customer.email}
            </Typography>
          </Item>
          <Item>
            <Typography variant="h6">Phone</Typography>
            <Typography variant="body1">
              <PhoneIcon sx={{ fontSize: 18, marginRight: 1, verticalAlign: 'middle' }} />
              {customer.phone}
            </Typography>
          </Item>
          <Item>
            <Typography variant="h6">Location</Typography>
            <Typography variant="body1">
              <LocationOnIcon sx={{ fontSize: 18, marginRight: 1, verticalAlign: 'middle' }} />
              {customer.location}
            </Typography>
          </Item>
          <Item>
            <Typography variant="h6">Date Joined</Typography>
            <Typography variant="body1">{formatDate(customer.date)}</Typography>
          </Item>
          <Item>
            <Typography variant="h6">Status</Typography>
            <Typography variant="body1">{customer.status === 1 ? 'Active' : 'Inactive'}</Typography>
          </Item>
          <Item>
            <Typography variant="h6">Total Purchases</Typography>
            <Typography variant="body1">
              <NumericFormat value={customer.total} displayType="text" thousandSeparator prefix="$" />
            </Typography>
          </Item>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Purchased Items
        </Typography>
        <Divider />
        {customer.items.map((item) => (
          <Box key={item.id} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Item>
                  <Typography variant="body1">{item.name}</Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <Typography variant="body1">Quantity: {item.quantity}</Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <Typography variant="body1">
                    <NumericFormat value={item.price} displayType="text" thousandSeparator prefix="$" /> each
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

export default CustomerDetails;
