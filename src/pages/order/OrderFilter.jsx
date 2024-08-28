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

export default function OrdersFilters({ onSearch, onFilter }) {
  const [status, setStatus] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    onFilter({ location, status: event.target.value, startDate, endDate });
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
        Filter Orders
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search Order"
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ mb: 2, boxShadow: 1 }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Select value={status} onChange={handleStatusChange} displayEmpty fullWidth variant="outlined" sx={{ mb: 2, boxShadow: 1 }}>
            <MenuItem value="">
              <em>Status</em>
            </MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
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
        </Grid>
      </Grid>
    </Card>
  );
}

OrdersFilters.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
};
