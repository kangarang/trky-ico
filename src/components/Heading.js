import React from 'react';
import turkeySVG from '../assets/turkey.svg';
import thankYou from '../assets/speech-bubble.png';

const styles = {
  imgStyle: {
    maxWidth: '35px'
  },
  container: {
    padding: '2em 2em 0',
    color: '#d37a15',
    fontSize: '1.3em',
  },
  bowery: {
    fontWeight: 'bold',
    margin: '3em 0 0',
    padding: '1em .2em',
    border: '2px solid #f4bf42',
    borderRadius: '25px',
    color: '#fcb819'
  },
};

const icons = {
  heart: <i className="fa fa-heart" aria-hidden="true" />,
  turk: <img style={styles.imgStyle} src={turkeySVG} alt='turkey svg' />,
  thankYou: <img style={styles.imgStyle} src={thankYou} alt='thank you png' />
}

const Heading = () => {
  return (
    <div style={styles.container}>

      <div>
        {icons.turk}<strong>{` TurkeyCoin (TRKY) `}</strong>{` is EXTREMELY EXCLUSIVE. There are only 1000 of these VERY RARE coins!!!`}
      </div>

      <div>
        {`What does TurkeyCoin get you? Love of family and a full `}
        {icons.heart}{` heart `}{icons.heart}
        {` Now that's what I call utility!`}
      </div>

      <div style={styles.bowery}>
        <div>{'All proceeds from the TurkeyCoin ICO will be donated to '}
          <a target='_blank' href='https://www.bowery.org/' rel='noopener noreferrer'>
            {'The Bowery Mission.'}
          </a>
          {icons.thankYou}
        </div>

        <br/>

        <div>
          {'The Bowery Mission serves homeless, hungry and poor New Yorkers.'}<br/><br/>{'Make sure to GOBBLE up this incredible buying opportunity!!!!!'}
        </div>
      </div>
    </div>
  );
};

export default Heading;
