// src/VoltacoresLogo.jsx
import React from 'react';

const VoltacoresLogo = ({ className }) => (
  <img
    src="/logo.png" // Path to your logo image in the 'public' folder
    alt="Voltacores Logo"
    className={className}
    onError={(e) => {
      e.target.onerror = null; // Prevent infinite loop if fallback also fails
      e.target.src = "https://placehold.co/48x48/CCCCCC/000000?text=VL"; // Fallback placeholder
    }}
  />
);

export default VoltacoresLogo;