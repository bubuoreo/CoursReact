import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Make sure to install react-icons

const User = ({ name, email, balance }) => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-lg-11" >
        
          <span className="text-sm font-bold ">Balance: ${balance}</span>  
        </div>
        <div className="col-md-6 col-lg-1" >
        <FaUserCircle style={{ fontSize: '2.5rem' }} aria-hidden="true" />
          <span className="font-semibold text-sm">  {name}</span>
        </div>
      </div> 
    </div>

);
};

export default User;
