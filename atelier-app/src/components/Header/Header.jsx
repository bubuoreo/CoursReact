import React from 'react';
import User from '../User/User.jsx';

export const Header = () => {
  return (
    <header className="w-full flex justify-between items-center px-4 py-2 bg-gray-200 shadow-md">
      <h1 className="text-xl font-bold">My Application</h1>
      <User name={"tom"} email={"tom.darold@"} balance={"3000000000k"} />
    </header>
  );
};

