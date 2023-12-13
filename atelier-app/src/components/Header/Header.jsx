import React from 'react';
import User from '../User/User.jsx';
import { useSelector } from 'react-redux';

export const Header = () => {

  let user = useSelector(state => state.userReducer.user);
  console.log(user)
  return (
    <header className="w-full flex justify-between items-center px-4 py-2 bg-gray-200 shadow-md">
      <h1 className="text-xl font-bold">My Application</h1>
      <User name={user.login} email={user.email} balance={user.account} />
    </header>
  );
};

