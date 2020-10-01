import React from 'react';

import { Button } from 'antd';

export default function AdvSearch() {
  function showForm(e) {
    e.preventDefault();
  }

  return (
    <div>
      <Button type="primary" className="adv-search-btn" onClick={showForm}>
        Advanced Search
      </Button>
    </div>
  );
}
