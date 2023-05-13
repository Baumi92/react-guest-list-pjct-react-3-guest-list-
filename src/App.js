import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://my-api.com/guests')
      .then((response) => {
        setGuests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAddGuest = (event) => {
    event.preventDefault();
    const newGuest = {
      firstName: firstName,
      lastName: lastName,
      attending: false,
    };
    axios
      .post('https://my-api.com/guests', newGuest)
      .then((response) => {
        setGuests([...guests, response.data]);
        setFirstName('');
        setLastName('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteGuest = (id) => {
    axios
      .delete(`https://my-api.com/guests/${id}`)
      .then(() => {
        setGuests(guests.filter((guest) => guest.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggleAttending = (id) => {
    const updatedGuests = guests.map((guest) => {
      if (guest.id === id) {
        return {
          ...guest,
          attending: !guest.attending,
        };
      } else {
        return guest;
      }
    });
    axios
      .put(
        `https://my-api.com/guests/${id}`,
        updatedGuests.find((guest) => guest.id === id),
      )
      .then(() => {
        setGuests(updatedGuests);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleAddGuest}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <label htmlFor="lastName">Last Name</label>
      </form>
    </div>
  );
}
export default App;
