import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [items, setItems] = useState([]);

  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://127.0.0.1:8000/api';
  const endpoint = `${base}/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Leaderboard fetched:', data);
        const list = data && data.results ? data.results : data;
        setItems(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error('Leaderboard fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {items.map((l) => (
          <li key={l.id || JSON.stringify(l)} className="list-group-item">
            <strong>{l.team ? l.team : `Team ${l.team_id || ''}`}</strong>
            <div>Points: {l.points}</div>
            <pre className="mb-0">{JSON.stringify(l, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
