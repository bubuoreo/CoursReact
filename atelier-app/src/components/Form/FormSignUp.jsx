import React, { useState } from 'react';

const UserForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== rePassword) {
      alert("Passwords do not match.");
      return;
    }
    // Pass the form data up to the parent component or handle it here
    onSubmit({ name, surname, password });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="surname">Surname</label>
        <input
          id="surname"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="rePassword">Re-Password</label>
        <input
          id="rePassword"
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">OK</button>
      </div>
    </form>
  );
};

export default UserForm;
