import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element with id 'root' not found in the DOM.");
  // Можна додати тут обробку помилки або створити елемент динамічно, якщо це необхідно
}
