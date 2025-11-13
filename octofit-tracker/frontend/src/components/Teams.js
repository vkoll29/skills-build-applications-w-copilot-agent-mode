import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [items, setItems] = useState([]);

  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://127.0.0.1:8000/api';
  const endpoint = `${base}/teams/`;

  useEffect(() => {
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Teams fetched:', data);
        const list = data && data.results ? data.results : data;
        setItems(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error('Teams fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {items.map((t) => (
          <li key={t.id || t.name || JSON.stringify(t)} className="list-group-item">
            <strong>{t.name}</strong>
            <pre className="mb-0">{JSON.stringify(t, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
