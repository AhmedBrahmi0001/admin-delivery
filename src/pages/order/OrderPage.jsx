import React, { useState } from 'react';

import OrdersFilters from '../order/OrderFilter'; // Corrected import path
import OrderList from '../order/OrderTable';

export default function OrderPage() {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <OrdersFilters onSearch={setSearchText} />
      <OrderList searchText={searchText} />
    </div>
  );
}
