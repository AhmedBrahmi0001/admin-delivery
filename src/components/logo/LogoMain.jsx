import React from 'react';
import logo0 from 'assets/images/logo0.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  // Inline styles for the logo component
  const logoWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px' // Space between the logo and text
  };

  const logoButtonStyle = {
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: 'pointer',
    outline: 'none'
  };

  const logoImageStyle = {
    width: '100px',
    height: 'auto', // Maintain aspect ratio
    borderRadius: '8px', // Rounded corners
    transition: 'transform 0.3s ease'
  };

  const handleMouseOver = (e) => {
    e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
  };

  const handleFocus = (e) => {
    e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
  };

  const handleBlur = (e) => {
    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
  };

  return (
    <button
      style={logoButtonStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label="Mantis Logo"
    >
      <div style={logoWrapperStyle}>
        <img src={logo0} alt="Mantis" style={logoImageStyle} />
      </div>
    </button>
  );
};

export default Logo;
