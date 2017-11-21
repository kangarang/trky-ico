import React from 'react';

const dialogStyle = {
  padding: '.25em 1em',
  color: '#F79220',
  fontWeight: 'bold'
};

const Dialog = ({ message, subMessage }) => {
  return (
    <div style={dialogStyle}>
      <div>{message} {subMessage}</div>
    </div>
  );
};

export default Dialog;
