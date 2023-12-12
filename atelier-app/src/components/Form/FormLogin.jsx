import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const FormLogin = ({ onConnect, onCancel }) => {
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onConnect(surname, password);
  };

  const navigate = useNavigate();

  const handleSignIn = () => {
    // Directly navigate to the home page without credentials check
    navigate('/home');}

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
              Surname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="surname"
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={handleSignIn} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Connect
            </button>
            <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={onCancel}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default FormLogin;