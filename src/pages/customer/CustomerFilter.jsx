import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DatePicker from '@mui/lab/DatePicker';

export default function CustomersFilters({ onSearch, onFilter }) {
  const [location, setLocation] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    onFilter({ location: event.target.value, status, startDate, endDate });
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    onFilter({ status: parseInt(event.target.value) });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onFilter({ location, status, startDate: date, endDate });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onFilter({ location, status, startDate, endDate: date });
  };

  return (
    <Card sx={{ p: 3, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filter Customers
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search customer"
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ mb: 2, boxShadow: 1 }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            label="Location"
            value={location}
            onChange={handleLocationChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, boxShadow: 1 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select value={status} onChange={handleStatusChange} displayEmpty fullWidth variant="outlined" sx={{ mb: 2, boxShadow: 1 }}>
            <MenuItem value="">
              <em>Status</em>
            </MenuItem>
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2, boxShadow: 1 }} />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2, boxShadow: 1 }} />}
          />
        </Grid> */}
      </Grid>
    </Card>
  );
}

CustomersFilters.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
};
