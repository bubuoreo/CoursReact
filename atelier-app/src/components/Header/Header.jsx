import React from 'react';
import User from '../User/User.jsx';
import { useSelector } from 'react-redux';

export const Header = () => {

  let user = useSelector(state => state.userReducer.user);
  console.log(user)
  return (

    <header>
      <h1 className="text-xl font-bold text-center">My Application</h1>
      <User name={user.login} email={user.email} balance={user.account} />
    </header>
  );
};

