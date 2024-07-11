import React, { useState } from 'react';

import CustomersFilters from '../customer/CustomerFilter'; // Corrected import path
import UserList from '../customer/CustomerTable';

export default function CustomerPage() {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <CustomersFilters onSearch={setSearchText} />
      <UserList searchText={searchText} />
    </div>
  );
}
