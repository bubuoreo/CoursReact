import React from 'react';
import User from '../User/User.jsx';

export const Header = () => {
  return (
    <header>
      <h1 className="text-xl font-bold text-center">My Application</h1>
      <User name={"tom"} email={"tom.darold@"} balance={"3000000000k"} />
    </header>
  );
};

