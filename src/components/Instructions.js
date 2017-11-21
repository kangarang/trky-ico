import React from 'react';

const dialogStyle = {
  padding: '.25em 1em',
  color: '#d37a15',
  fontWeight: 'bold'
};

const Instructions = ({ message, subMessage }) => {
  return (
    <div style={dialogStyle}>
      <div>{message}</div>
      <div>{subMessage}</div>
    </div>
  );
};

export default Instructions;
