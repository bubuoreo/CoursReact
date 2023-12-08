import React, { useState } from 'react';

const LoginPage = ({ onLogin, onCancel }) => {
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Implement login logic here, possibly involving an API call.
    console.log('Login with:', surname, password);
    onLogin(surname, password);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Connect</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;