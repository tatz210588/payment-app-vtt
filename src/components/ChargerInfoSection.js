import React from 'react';
import ChargerInfo from './ChargerInfo';

function ChargerInfoSection({ chargerInfo }) {
  return (
    <div className="centered-content" style={styles.container}>
      <h2 style={styles.title} className="centered-text">Charger Information</h2>
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
    justifyContent: 'center'
  },
  container: {
    boxShadow: '4px 4px 10px -4px rgba(0,0,0,0.75)'
  }
};

export default ChargerInfoSection;

