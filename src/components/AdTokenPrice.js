import React from 'react';

const style = {
  color: '#d37a15',
  padding: '.25em 1em',
}

const AdTokenPrice = () => {
  return (
    <div style={style}>
      <div>
        {'1 TRKY costs 1 ETH'}
      </div>
      <div>
        {'You can purchase a fraction of TRKY!'}
      </div>
    </div>
  );
};

export default AdTokenPrice;
