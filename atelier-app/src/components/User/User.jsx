import React from 'react';
import { useNavigate } from 'react-router-dom';

const User = ({ name, email, balance, page }) => {

  const navigate = useNavigate();

  const handleHome = async () => {
    navigate('/home');
  };

  return (

    <div className="ui clearing segment">
            <h3 className="ui right floated header">
                <i className="user circle outline icon"></i>
                <div className="content">
                    <span id="userNameId">{name}</span>
                    <div className="sub header"><span>{balance}</span>$</div>
                </div>
            </h3>
            <h3 className="ui left floated header">
                <i className="money icon" onClick={handleHome}></i>
                <div className="content">
                    {page}
                    <div className="sub header">{page} your card to get money</div>
                </div>
            </h3>
    </div>

);
};

export default User;
