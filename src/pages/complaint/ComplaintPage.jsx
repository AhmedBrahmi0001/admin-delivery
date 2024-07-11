import React, { useState } from 'react';

import ComplaintsFilters from './ComplaintFilter'; // Corrected import path
import ComplaintList from '../complaint/ComplaintTable';

export default function ComplaintPage() {
  const [searchText, setSearchText] = useState('');
  const [filterValue, setFilterValue] = useState('');

  return (
    <div>
      <ComplaintsFilters onSearch={setSearchText} onFilterChange={setFilterValue} filterValue={filterValue} />
      <ComplaintList searchText={searchText} />
    </div>
  );
}
