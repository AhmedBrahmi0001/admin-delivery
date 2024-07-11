import React, { useState } from 'react';

import DriversFilters from '../driver/DriverFilter'; // Corrected import path
import DriverList from '../driver/DriverTable';

export default function DriverPage() {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div>
      <DriversFilters onSearch={setSearchText} onStatusChange={setStatus} />
      <DriverList searchText={searchText} status={status} />
    </div>
  );
}
