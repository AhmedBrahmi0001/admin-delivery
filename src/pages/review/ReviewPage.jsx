import React, { useState } from 'react';

import ReviewsFilters from '../review/ReviewFilter'; // Corrected import path
import ReviewList from '../review/ReviewTable';

export default function ReviewPage() {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      <ReviewsFilters onSearch={setSearchText} />
      <ReviewList searchText={searchText} />
    </div>
  );
}
