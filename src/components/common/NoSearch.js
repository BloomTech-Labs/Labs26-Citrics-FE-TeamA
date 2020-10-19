import React from 'react';
import Loader from './Loader';

export default function NoSearch(options) {
  return options.options ? (
    <div className="empty">
      <p>Loading.... Please wait while we retrieve the city data requested.</p>
      <Loader />
    </div>
  ) : (
    <div className="empty">
      <p>
        Yikes, we are having errors. We have failed to connect to the back end.{' '}
      </p>
    </div>
  );
}
