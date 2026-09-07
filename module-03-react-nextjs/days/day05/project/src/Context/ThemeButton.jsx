import { useTheme } from "../context/ThemeContext";

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Theme: {theme}
    </button>
  );
}

export default ThemeButton;