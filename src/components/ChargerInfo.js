import React from 'react';

export default function ChargerInfo({ chargerInfo }) {
  return (
    <div className="centered-content">
      <p className="centered-text">ID: {chargerInfo.id}</p>
      <p className="centered-text">Location: {chargerInfo.location}</p>
      <p className="centered-text">Type: {chargerInfo.type}</p>
    </div>
  );
}
