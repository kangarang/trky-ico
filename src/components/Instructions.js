import React from 'react';

const dialogStyle = {
  margin: '2em',
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
