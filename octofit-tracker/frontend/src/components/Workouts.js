import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [items, setItems] = useState([]);

  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://127.0.0.1:8000/api';
  const endpoint = `${base}/workouts/`;

  useEffect(() => {
    console.log('Workouts endpoint:', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Workouts fetched:', data);
        const list = data && data.results ? data.results : data;
        setItems(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error('Workouts fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Workouts</h2>
      <ul className="list-group">
        {items.map((w) => (
          <li key={w.id || w.name || JSON.stringify(w)} className="list-group-item">
            <strong>{w.name}</strong>
            <div>{w.description}</div>
            <pre className="mb-0">{JSON.stringify(w, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
