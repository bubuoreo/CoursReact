import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Make sure to install react-icons

const User = ({ name, email, balance }) => {

  return (
    <div className="container mx-auto">
    <div className="grid grid-cols-3 gap-4 border p-4">
      <div className="flex items-center">
        <FaUserCircle className="text-xl" aria-hidden="true" />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-sm">{name}</span>
        <span className="text-xs text-gray-600">{email}</span>
      </div>
      <div className="flex items-end justify-end">
        <span className="text-sm font-bold">${balance}</span>
      </div>
    </div>
  </div>
);
};

export default User;
