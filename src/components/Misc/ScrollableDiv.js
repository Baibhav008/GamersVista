// ScrollableDiv.js

import React from 'react';

const ScrollableDiv = ({ children, height }) => {
  const divStyle = {
    marginTop:'8px',
    overflowY: 'auto',
    height: height || '300px', // Set a default height if not provided
    
    padding: '10px',
    scrollbarWidth: 'thin', // Set the width
    scrollbarColor: 'white transparent'
    
  };

  return (
    <div style={divStyle}>
      {children}
    </div>
  );
};

export default ScrollableDiv;
