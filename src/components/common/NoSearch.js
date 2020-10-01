import React from 'react';
import Loader from './Loader';

export default function NoSearch() {
  return (
    <div className="empty">
      <p>Loading.... Please wait while we retrieve the city data requested.</p>
      <Loader />
    </div>
  );
}
