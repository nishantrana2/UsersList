import React, { useReducer, useEffect, useCallback, useMemo, useState } from 'react';

import UserForm from './UserForm';
import UserList from './UserList';
import ErrorModal from '../UI/ErrorModal';

import useHttp from '../../hooks/http';

const userReducer = (currentUsers, action) => {
  switch (action.type) {
    case 'SET':
      return action.users;
    case 'ADD':
      return [...currentUsers, action.user];
    case 'DELETE':
      return currentUsers.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const Users = () => {
  const [userUsers, dispatch] = useReducer(userReducer, []);
  const [userSum, setUserSum] = useState([]);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer,
    clear
  } = useHttp();

  useEffect(() => {
    
    if (!isLoading && !error && reqIdentifer === 'REMOVE_USER') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === 'ADD_USER') {
      dispatch({
        type: 'ADD',
        user: { id: data.name, ...reqExtra }
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);


  const addUserHandler = useCallback(user => {
    
    console.log(user);
    var loadedUsers = userSum;
    let flag = 0;
    for (const key in user) {
      if (key === "sum") {
        for (let i = 0; i < loadedUsers.length; ++i) {
          if (loadedUsers[i] === user.sum) {
            alert("Try another Unique ID. Since, this key has been used before by another user. ");
            flag = 1;
          }
        }
        if (flag !== 1) {
          loadedUsers.push(user.sum);
        }

      }
    }
    console.log(loadedUsers);
    setUserSum(loadedUsers);
    if (flag !== 1) {
      sendRequest(
        'https://userslist-872c1.firebaseio.com/users.json',
        'POST',
        JSON.stringify(user),
        user,
        'ADD_USER'
      );
    }
  }, [sendRequest]);


  const removeUserHandler = useCallback(
    userId => {
      sendRequest(
        `https://userslist-872c1.firebaseio.com/users/${userId}.json`,
        'DELETE',
        null,
        userId,
        'REMOVE_USER'
      );
    },
    [sendRequest]
  );

  const userList = useMemo(() => {
    return (
      <UserList
        users={userUsers}
        onRemoveItem={removeUserHandler}
      />
    );
  }, [userUsers, removeUserHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <UserForm
        onAddUser={addUserHandler}
        loading={isLoading}
      />

      <section>
        {userList}
      </section>
    </div>
  );
};

export default Users;
