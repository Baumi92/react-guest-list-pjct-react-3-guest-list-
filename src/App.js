import React, { useEffect, useState } from 'react';

const App = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const baseUrl = 'http://localhost:4000';

  const loadGuests = async () => {
    try {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuests(allGuests);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadGuests().catch((error) => {
      console.log(error);
    });
  }, []);

  const addGuest = async () => {
    if (firstName && lastName) {
      try {
        const response = await fetch(`${baseUrl}/guests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName }),
        });
        const createdGuest = await response.json();
        setGuests([...guests, createdGuest]);
        setFirstName('');
        setLastName('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteGuest = async (guestId) => {
    try {
      await fetch(`${baseUrl}/guests/${guestId}`, { method: 'DELETE' });
      setGuests(guests.filter((guest) => guest.id !== guestId));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAttending = async (guestId) => {
    try {
      const updatedGuests = guests.map((guest) => {
        if (guest.id === guestId) {
          return {
            ...guest,
            attending: !guest.attending,
          };
        }
        return guest;
      });

      await fetch(`${baseUrl}/guests/${guestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attending: !guestId.attending }),
      });
      setGuests(updatedGuests);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await addGuest();
    }
  };

  return (
    <div className="App">
      <h1>Guest List</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          {guests.map((guest) => (
            <div key={`guest-${guest.id}`} data-test-id="guest">
              <span>
                {guest.firstName} {guest.lastName}
              </span>
              <button onClick={() => deleteGuest(guest.id)}>Remove</button>
              <label>
                <input
                  type="checkbox"
                  checked={guest.attending}
                  onChange={() => toggleAttending(guest.id)}
                />
                {guest.attending ? 'Attending' : 'Not Attending'}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
