import React, { useEffect, useState } from 'react';

const Users = () => {
  const [items, setItems] = useState([]);

  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://127.0.0.1:8000/api';
  const endpoint = `${base}/users/`;

  useEffect(() => {
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Users fetched:', data);
        const list = data && data.results ? data.results : data;
        setItems(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error('Users fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {items.map((u) => (
          <li key={u.id || u.email || JSON.stringify(u)} className="list-group-item">
            <strong>{u.name || u.email}</strong>
            <div>{u.email}</div>
            <pre className="mb-0">{JSON.stringify(u, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
