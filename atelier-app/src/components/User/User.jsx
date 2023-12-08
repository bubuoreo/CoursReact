import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Make sure to install react-icons

const User = ({ name, email, balance }) => {
  return (
    <div className="flex items-center justify-end space-x-2 p-2 absolute top-0 right-0">
      <FaUserCircle className="text-xl" aria-hidden="true" />
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-sm">{name}</span>
        <span className="text-xs text-gray-600">{email}</span>
      </div>
      <div className="text-sm font-bold">${balance}</div>
    </div>
  );
};

export default User;
