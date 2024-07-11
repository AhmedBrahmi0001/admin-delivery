import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function ComplaintsFilters({ onSearch, onFilterChange, filterValue }) {
  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search Complaint"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px', mb: 2 }}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Select
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ maxWidth: '500px' }}
        displayEmpty
        inputProps={{ 'aria-label': 'Filter by suivant etat' }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="resolved">Resolved</MenuItem>
        <MenuItem value="rejected">Rejected</MenuItem>
      </Select>
    </Card>
  );
}

ComplaintsFilters.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired
};
