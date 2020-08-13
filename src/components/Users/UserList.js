import React from 'react';

import './UserList.css';

const UserList = props => {
  console.log('RENDERING USERLIST');
  return (
    <section className="user-list">
      <h2>Users List</h2>
      <ul>
        {props.users.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
           
            <div>{ig.first} {ig.last}</div>
            <div><h5>ID: {ig.unique}</h5></div>
            <div>{ig.description}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserList;
