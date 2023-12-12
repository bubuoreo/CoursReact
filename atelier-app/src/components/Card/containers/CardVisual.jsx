import React from 'react';
import { FaHeart, FaBolt } from 'react-icons/fa'; // Make sure to install react-icons for these

const CardVisual = ({ title, imageUrl, description, health, power }) => {
  return (
    <div className="card-visual bg-white rounded-lg shadow-md p-4 text-center">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-2" />
      <p className="text-sm mb-2">{description}</p>
      <div className="flex justify-center items-center space-x-2">
        <FaHeart className="text-red-500" /> <span>{health}</span>
        <FaBolt className="text-yellow-500" /> <span>{power}</span>
      </div>
      <button className="mt-4 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Close</button>
    </div>
  );
};

export default CardVisual;
