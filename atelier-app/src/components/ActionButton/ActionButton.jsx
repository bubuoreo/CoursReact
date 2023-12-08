import React from 'react';
import { FaShoppingCart, FaDollarSign, FaPlay } from 'react-icons/fa'; // Install react-icons if not already

const icons = {
  buy: FaShoppingCart,
  sell: FaDollarSign,
  play: FaPlay
};

const ActionButton = ({ action, label }) => {
  const IconComponent = icons[action];

  return (
    <button className="flex items-center justify-center px-4 py-2 border rounded shadow hover:bg-gray-100">
      {IconComponent ? <IconComponent className="mr-2" /> : null}
      {label}
    </button>
  );
};

export default ActionButton;

