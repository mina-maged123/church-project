import { createGlobalStyle } from 'styled-components';
import './variables.css';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cinzel:wght@400;600;700&family=Lora:wght@400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-width: 320px;
    background:
      radial-gradient(circle at top, rgba(27, 58, 107, 0.18), transparent 32%),
      radial-gradient(circle at bottom right, rgba(139, 26, 26, 0.12), transparent 28%),
      linear-gradient(180deg, rgba(245, 240, 232, 0.96), rgba(241, 232, 216, 0.98));
    color: var(--dark-ink);
    font-family: var(--font-body);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.03) 50%, rgba(0, 0, 0, 0.02) 50%),
      radial-gradient(circle at 20% 20%, rgba(201, 168, 76, 0.08), transparent 26%),
      radial-gradient(circle at 80% 10%, rgba(27, 58, 107, 0.08), transparent 22%),
      radial-gradient(circle at 50% 80%, rgba(139, 26, 26, 0.06), transparent 28%);
    background-size: 100% 4px, 900px 900px, 800px 800px, 1000px 1000px;
    mix-blend-mode: multiply;
    opacity: 0.75;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  ::selection {
    background: rgba(201, 168, 76, 0.35);
  }
`;
