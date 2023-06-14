import React from 'react';
import ChargerInfo from './ChargerInfo';

function ChargerInfoSection({ chargerInfo }) {
  return (
    <div className="centered-content">
      <p style={styles.title} className="centered-text">Charger Information</p>
      <ChargerInfo chargerInfo={chargerInfo} />
    </div>
  );
}

const styles = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
};

export default ChargerInfoSection;

