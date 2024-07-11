import React, { useState } from 'react';

import PlacesFilters from '../place/PlaceFilter'; // Corrected import path
import PlaceList from '../place/PlaceTable';

export default function PlacePage() {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <PlacesFilters onSearch={setSearchText} />
      <PlaceList searchText={searchText} />
    </div>
  );
}
