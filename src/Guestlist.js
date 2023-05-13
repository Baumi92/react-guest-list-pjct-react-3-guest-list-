import React from 'react';
import App from './App';

const GuestList = ({
  guests,
  onAddGuest,
  onDeleteGuest,
  onToggleAttending,
}) => {
  const handleAddGuest = (event) => {
    if (event.key === 'Enter') {
      const firstName = event.target.value.trim();
      if (firstName) {
        event.target.value = '';
        onAddGuest(firstName);
      }
    }
  };

  const handleDeleteGuest = (guestIndex) => {
    onDeleteGuest(guestIndex);
  };

  const handleToggleAttending = (guestIndex) => {
    onToggleAttending(guestIndex);
  };

  const renderGuest = (guest, index) => {
    return (
      <div className="guest" data-test-id="guest" key={index}>
        <div className="guest-info">
          <div className="guest-name">
            {guest.firstName} {guest.lastName}
          </div>
          <div className="guest-attending">
            <input
              type="checkbox"
              id={`guest-${index}`}
              checked={guest.isAttending}
              onChange={() => handleToggleAttending(index)}
              aria-label={`${guest.firstName} ${guest.lastName} attending status`}
            />
            <label htmlFor={`guest-${index}`}>
              {guest.isAttending ? 'Attending' : 'Not attending'}
            </label>
          </div>
        </div>
        <button
          className="guest-delete"
          onClick={() => handleDeleteGuest(index)}
          aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
        >
          Remove
        </button>
      </div>
    );
  };

  return (
    <div className="guest-list">
      <div className="guest-list-top-text">Add a new guest:</div>
      <div className="guest-list-inputs">
        <input
          type="text"
          placeholder="First name"
          onKeyPress={handleAddGuest}
          aria-label="First name"
        />
        <input
          type="text"
          placeholder="Last name"
          onKeyPress={handleAddGuest}
          aria-label="Last name"
        />
      </div>
      <div className="guest-list-bottom-text">
        <button
          className="attending-button"
          onClick={() => console.log('Attending clicked')}
        >
          Attending
        </button>
        <div>Add or remove guests:</div>
      </div>
      {guests.map(renderGuest)}
    </div>
  );
};

export default GuestList;
