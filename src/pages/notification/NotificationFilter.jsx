import * as React from 'react';
import PropTypes from 'prop-types'; // Add this import
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react';

export default function NotificationsFilters({ onSearch }) {
  // Define onSearch in the function parameters
  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search Notification"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px' }}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Card>
  );
}

NotificationsFilters.propTypes = {
  onSearch: PropTypes.func.isRequired // Add this prop type definition
};
