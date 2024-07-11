import React, { useState } from 'react';

import NotificationsFilters from './NotificationFilter'; // Corrected import path
import NotificationList from '../notification/NotificationTable';

export default function NotificationPage() {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <NotificationsFilters onSearch={setSearchText} />
      <NotificationList searchText={searchText} />
    </div>
  );
}
