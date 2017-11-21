import React from 'react';

const styles = {
  balances: {
    display: 'flex',
  },
  adt: {
    border: '2px solid #d37a15',
    margin: '.3em',
    marginTop: 0,
    padding: '.3em'
  },
  eth: {
    border: '2px solid #3C3C3D',
    margin: '.3em',
    marginTop: 0,
    padding: '.3em'
  }
};

const Balances = ({ adtBalance, ethBalance }) => {
  return (
    <div>
      <div style={styles.balances}>
        <div style={styles.adt}>
          <div>{'Your TRKY balance:'}</div>
          <div>{adtBalance}</div>
        </div>
        <div style={styles.eth}>
          <div>{'Your ETH balance:'}</div>
          <div>{ethBalance}</div>
        </div>
      </div>
    </div>
  );
};

export default Balances;
