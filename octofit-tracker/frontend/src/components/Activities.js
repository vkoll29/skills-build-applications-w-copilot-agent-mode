import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [items, setItems] = useState([]);

  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://127.0.0.1:8000/api';
  const endpoint = `${base}/activities/`;

  useEffect(() => {
    console.log('Activities endpoint:', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Activities fetched:', data);
        const list = data && data.results ? data.results : data;
        setItems(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error('Activities fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {items.map((a) => (
          <li key={a.id || JSON.stringify(a)} className="list-group-item">
            <strong>{a.type || a.name || 'Activity'}</strong>
            <div>{a.duration ? `${a.duration} minutes` : ''}</div>
            <pre className="mb-0">{JSON.stringify(a, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
