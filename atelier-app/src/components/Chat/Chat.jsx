import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import MessageBox from './containers/MessageBox.jsx'

const ChatComponent = () => {
  let user = useSelector(state => state.userReducer.user);
  console.log(user.id);
  const [test, setTest] = useState('');
  const [messageArray, setMessageArray] = useState([]);
  const message = useRef();
  const socket = io('http://localhost:3000', { query: { id: user.id } });

  const handleSendMessage = (e) => {
    e.preventDefault();
    var data = {"name":user.name, "emit":user.id, "dest": user.id, "msg":message.current.value}
    socket.emit('chat message', JSON.stringify(data));
  };

  // document.getElementById('userId').innerText = user.id;
  // var form = document.getElementById('form');
  // var input = document.getElementById('input');
  // var dest = document.getElementById('destinataire');
  // var userParagraph = document.getElementById('idUser');
  // var connectedUsersParagraph = document.getElementById('connectedUsers');
  // var springbootUsersParagraph = document.getElementById('springbootUsers');
  // userParagraph.innerHTML = `User : ${randomNumber}`;

  // getSpringbootUsers(springbootUsersParagraph);
  // socket.emit('getSpringbootUsers');

  // form.addEventListener('submit', function (e) {
  //   e.preventDefault();

  //   if (input.value) {
  //     const body = { "msg": input.value };
  //     if (dest.value) {
  //       body["dest"] = dest.value;
  //     }
  //     socket.emit('chat message', JSON.stringify(body));
  //     input.value = '';

  //   }
  // });

  socket.on('chat message', function (data) {
    setTest(data);
    setMessageArray(oldArray => [...oldArray, JSON.parse(data)])
    // var item = document.createElement('li');
    // item.textContent = msg;
    // messages.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
  });

  // useEffect(() => {
  //   setTest(arg)
  // }, [arg]);
  // socket.on('updateSpringbootUsers', (data) => {
  //   springbootUsersParagraph.innerText = `Utilisateurs connectés : ${data}`;
  // });

  return (
    <div>
      <p>{user.id}</p>
      <p>{test}</p>
      <div className="ui segment">
        <div className="ui top attached label">
          <div className="ui two column grid">
            <div className="column">Chat</div>
            <div className="column">
              <div className="ui two column grid">
                <div className="column">Eric Smith</div>
                <div className="column"> <i className="user circle icon"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui fluid search selection dropdown">
        <input type="hidden" name="country" />
        <i className="dropdown icon"></i>
        <div className="default text">Select User</div>
        <div className="menu">
          <div className="item" data-value="jd"><i className="jd user circle icon"></i>John Doe</div>
          <div className="item" data-value="er"><i className="er user circle icon"></i>Eric SMith</div>
        </div>
      </div>
      <div className="ui segment">
        {messageArray.map((msg) => (
              <MessageBox data={msg}/>
          ))}
      </div>
      <div className="ui form">
        <div className="field">
          <textarea ref={message} rows="2"></textarea>
        </div>
      </div>
      <button onClick={handleSendMessage} className="fluid ui right labeled icon button">
        <i className="right arrow icon"></i>
        Send
      </button>
    </div>
  );
};

export default ChatComponent;
