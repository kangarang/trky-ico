import React from 'react';

const styles = {
  button: {
    border: '1px solid #d37a15',
    marginLeft: '1em'
  },
  imgStyle: {
    maxWidth: '400px'
  },
  container: {
    margin: '2em',
    color: '#4585c7',
    fontSize: '1.3em'
  }
}

const PurchaseTrky = ({ handleSubmit, handleChange, amount }) => {
  return (
    <div style={styles.container}>

      <form onSubmit={handleSubmit}>
        <input value={amount} onChange={handleChange} />
        <button style={styles.button}>
          {'Buy TRKY with ETH'}
        </button>
      </form>
    </div>
  );
};

export default PurchaseTrky;
