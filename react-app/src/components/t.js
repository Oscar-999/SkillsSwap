// ThemeToggleButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/theme';

function ThemeToggleButton() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button onClick={handleThemeToggle}>
      Toggle Theme (Current: {currentTheme})
    </button>
  );
}

export default ThemeToggleButton;
