// ScrollableDiv.js

import React from 'react';

const ScrollTwo = ({ children, height }) => {
  const divStyle = {
    marginTop: '8px',
    overflowY: 'auto',
    height: height || '100vh', 
    padding: '8px',
    marginInline:"auto",
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    scrollbarWidth: 'thin',
    scrollbarColor: 'white transparent',
    
  };

  return (
    <div style={divStyle}>
       {children}
        
    
    </div>
  );
};

export default ScrollTwo;
