// themes.js
const TOGGLE_THEME = 'theme/TOGGLE_THEME';

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

const initialState = 'light'; // Set your default theme here

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
}
