import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './UserForm.css';

const UserForm = React.memo(props => {
  const [enteredUnique, setEnteredUnique] = useState('');
  const [enteredFirst, setEnteredFirst] = useState('');
  const [enteredLast, setEnteredLast] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredSum, setEnteredSum] = useState('');
  console.log('RENDERING USER FORM');

  const submitHandler = event => {
    event.preventDefault();
    // props.onAddSum({ title: enteredTitle, amount: enteredDescription, first: enteredFirst, last: enteredLast, sum: enteredSum });
    props.onAddUser({ unique: enteredUnique, description: enteredDescription, first: enteredFirst, last: enteredLast, sum: enteredSum });
  };

  return (
    <section className="user-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="First">First Name</label>
            <input
              type="text"
              id="First"
              value={enteredFirst}
              onChange={event => {
                setEnteredFirst(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="Last">Last Name</label>
            <input
              type="text"
              id="Last"
              value={enteredLast}
              onChange={event => {
                setEnteredLast(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="unique">Unique Id*</label>
            <input
              type="text"
              id="Unique"
              value={enteredUnique}
              onChange={event => {
                let sum = 0;
                setEnteredUnique(event.target.value);
                for (var x = 0; x < event.target.value.length; x++)
                {
                    var c = event.target.value.charAt(x);
                    
                    if(!isNaN(c)){
                      sum = sum + parseInt(c);
                      console.log(sum)
                    
                    
                   }  
                }
              setEnteredSum(sum);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={enteredDescription}
              onChange={event => {
                setEnteredDescription(event.target.value);
              }}
            />
          </div>
          <div className="user-form__actions">
            <button type="submit">Add User</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default UserForm;
