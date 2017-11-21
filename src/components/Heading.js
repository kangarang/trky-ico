import React from 'react';
import pope from '../assets/tokenpope.png';

const styles = {
  imgStyle: {
    maxWidth: '400px'
  },
  container: {
    margin: '2em',
    color: '#d37a15',
    fontSize: '1.3em'
  }
};

const Heading = () => {
  return (
    <div style={styles.container}>
      <img src={pope} alt="turkey logo" style={styles.imgStyle} />

      <h2>{'Welcome to the TurkeyCoin ICO!'}</h2>

      <div>{"TurkeyCoin (TRKY) is EXTREMELY EXCLUSIVE. There are only 1000 of these VERY RARE coins!!! What does TurkeyCoin get you? Love of family and a full heart. Now that's what I call utility!"}</div>

      <div>{'All proceeds from the TurkeyCoin ICO will be donated to '}
        <a target='_blank' href='https://www.bowery.org/' rel='noopener noreferrer'>
          {'The Bowery Mission'}
        </a>
        {'. The Bowery Mission serves homeless, hungry and poor New Yorkers. '}
      </div>

      <div>{'Make sure to GOBBLE up this incredible buying opportunity!!!!!'}</div>
    </div>
  );
};

export default Heading;
