import React, { useState } from 'react';

function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button onClick={toggleTheme}>Toggle Theme</button>
  );
}

export default ThemeToggle;
