import React from 'react';

const MessageBox = ({data}) => {
    
  
    return (
          <div className="ui raised segment">
            <a className="ui blue ribbon label">{data.emit}</a>
            <span> 10:00:01</span>
            <p>{data.msg}</p>
          </div>
          
    );
  };
  
  export default MessageBox;
  