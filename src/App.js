import './App.css';
import { useState } from 'react';

export default function ExampleFormsWithControlledComponents() {
  const [label, setLabel] = useState('');
  // 1. Create the state variable
  const [usernameInput, setUsernameInput] = useState('');
  const [isCookiePolicyAccepted, setIsCookiePolicyAccepted] = useState(false);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <label>
        Cooke policy accepted?
        {/* // 2.  use the current value of the state as the checked property of the input*/}
        <input
          checked={isCookiePolicyAccepted}
          type="checkbox"
          // 3. update the state value with the event.currentTarget.checked
          onChange={(event) => {
            setIsCookiePolicyAccepted(event.currentTarget.checked);
          }}
        />
        <button>Accept</button>
      </label>
      onSubmit=
      {(event) => {
        event.preventDefault();
      }}
      {/* Boolean operator */}
      {label !== '' && <p>Username: {label}</p>}
      {/* 2. Connect the state with the input value */}
      <input
        value={usernameInput}
        onChange={(event) => {
          // 3. update state on change event
          setUsernameInput(event.currentTarget.value);
        }}
      />
      {/* Ternary operator */}
      {usernameInput === '' ? (
        ' please type ⌨️'
      ) : (
        <button
          onClick={() => {
            setLabel(usernameInput);
          }}
        >
          update label
        </button>
      )}
    </form>
  );
}
