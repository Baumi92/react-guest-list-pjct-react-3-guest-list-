import React, { useState } from 'react';

function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const addGuest = () => {
    if (!firstName.trim() || !lastName.trim()) {
      return; // Prevent adding a guest with empty fields
    }

    const newGuest = {
      id: Date.now(), // Generate a unique ID
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      attending: false,
    };

    setGuests([...guests, newGuest]);
    setFirstName('');
    setLastName('');
  };

  const deleteGuest = (id) => {
    setGuests(guests.filter((guest) => guest.id !== id));
  };

  const toggleAttending = (id) => {
    setGuests(
      guests.map((guest) =>
        guest.id === id ? { ...guest, attending: !guest.attending } : guest,
      ),
    );
  };

  return (
    <div className=".App">
      <h1>Guest List</h1>
      <div>
        <label htmlFor="firstName">First name:</label>
        <input
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last name:</label>
        <input
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              addGuest();
            }
          }}
        />
      </div>
      <button onClick={addGuest}>Add Guest</button>
      <hr />
      <h2>Guests:</h2>
      {guests.map((guest) => (
        <div key={`guest-${guest.id}`} data-test-id="guest">
          <span>
            {guest.firstName} {guest.lastName}
          </span>
          <button
            aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
            onClick={() => deleteGuest(guest.id)}
          >
            Remove
          </button>
          <label>
            Attending:{' '}
            <input
              type="checkbox"
              aria-label={`${guest.firstName} ${guest.lastName} attending status`}
              checked={guest.attending}
              onChange={() => toggleAttending(guest.id)}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default App;
