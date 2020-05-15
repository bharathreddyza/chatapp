import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({users}) => (
  <div className="textContainer">
  {console.log('h')}
    {
      users
        ? (
          <div className="chatlist">
            <h1>online users in the room:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                  <img src="https://img.icons8.com/ios/50/000000/user-female-circle.png"/>

                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;