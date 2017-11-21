import React from 'react';
import thankYou from '../assets/speech-bubble.png';

const styles = {
  imgStyle: {
    maxWidth: '35px'
  },
}

const txHashStyle = {
  padding: '1em'
}

const thankYouIcon = <img style={styles.imgStyle} src={thankYou} />

const TxHash = ({ txHash }) => (
  <div style={txHashStyle}>
    <div>Your transaction {thankYouIcon}</div>
      
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={`https://rinkeby.etherscan.io/tx/${txHash}`}
    >
      {txHash}
    </a>
  </div>
);

export default TxHash;
