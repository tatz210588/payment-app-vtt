import React from 'react';

export default function ChargerInfo({ chargerInfo }) {
  return (
    <div className='centered-content' style={styles.container}>
      <h3 className="centered-text"><p style={styles.infoHead}>ID:</p> <p style={styles.infoDetails}>{chargerInfo.id}</p></h3>
      <h3 className="centered-text"><p style={styles.infoHead}>Location:</p> <p style={styles.infoDetails}>{chargerInfo.location}</p></h3>
      <h3 className="centered-text"><p style={styles.infoHead}>Type:</p> <p style={styles.infoDetails}>{chargerInfo.type}</p></h3>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  infoHead: {
    fontWeight: 'bold',
    marginLeft: '10px'
  },
  infoDetails: {
    marginRight: '10px',
    fontWeight: 'normal'
  }
}