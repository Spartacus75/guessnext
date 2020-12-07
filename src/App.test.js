import { render, screen } from '@testing-library/react';
import App from './App';

test('ren ders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
