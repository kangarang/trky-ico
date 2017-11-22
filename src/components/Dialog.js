import React from 'react';

const dialogStyle = {
  padding: '.25em 1em',
  color: '#F79220',
  fontWeight: 'bold'
};

const networkMessageStyle = {
  color: 'red'
}

const Dialog = ({ message, subMessage, networkMessage }) => {
  return (
    <div style={dialogStyle}>
      {networkMessage && <div style={networkMessageStyle}>{networkMessage}</div>}
      <div>{message}</div>
      <div>{subMessage}</div>
    </div>
  );
};

export default Dialog;
